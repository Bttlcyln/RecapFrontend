import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  @Input() carId?: number;

  cars: Car[];
  brands: Brand[];
  colors: Color[];
  carUpdateForm: FormGroup = new FormGroup({});
  car: Car | null = null;
 // carId!: number;
  dailyPrice!: number;
  carName: string | null = null;
  brandId!: number;
  colorId!: number;
  modelYear: string | null = null;
  description: string | null = null;
  selectedBrandId:number;
  selectedColorId:number;

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
   if(this.carId){
    this.getCarById(this.carId);

   }else {
    this.activatedRoute.params.subscribe((params)=>{
      if(params["carId"]){
        this.carId=params["carId"];
        this.getCarById(params["carId"]);
      }else if(params["brandId"]){
        this.getCarByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarByColor(params["colorId"])
      }
    });
   }
   this.getBrands();
   this.getColors();
   this.createCarUpdateForm();
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.carId, Validators.required],
      dailyPrice: [this.dailyPrice || null, Validators.required],
      carName: [this.carName || null, Validators.required],
      brandId: [this.brandId || null, Validators.required],
      colorId: [this.colorId || null, Validators.required],
      modelYear: [this.modelYear || null, Validators.required],
      description: [this.description || null, Validators.required],
    });
  }

  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Lütfen tüm alanları doldurunuz', 'Dikkat!');
    }
  }

  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data;
      this.carId = this.car.carId;
      this.dailyPrice = this.car.dailyPrice;
      this.carName = this.car.carName;
      this.brandId = this.car.branId;
      this.colorId = this.car.colorId;
      // this.modelYear = this.car.modelYear;
      this.description = this.car.description;

      this.createCarUpdateForm();
    });
  }

  getCarByBrand(brandId:number){
    this.carService.getBrandId(brandId).subscribe((response) => {
      this.cars = response.data;
    })
  }

  getCarByColor(colorId:number){
    this.carService.getColorId(colorId).subscribe((response) => {
      this.cars = response.data;
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    })
  }
}
