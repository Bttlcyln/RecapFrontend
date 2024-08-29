import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import jwt_decode from 'jwt-decode';
import { interval, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  carImages: CarImage[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  dataLoaded = false;
  filterText = '';
  adminCheck = false;
  roles: Array<string>;
  subscription: Subscription;

  selectedCarId: number;
  deleteDialogVisible = false;
  updateDialogVisible = false;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private brandService: BrandService,
    private colorServie: ColorService,
    private router: Router,
    private toastr:ToastrService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getColorId(params['colorId']);
      } else this.getCars();
      this.getBrands();
      this.getColors();
    });
    this.isAdmin();

    this.subscription = interval(500).subscribe(() => {
      this.isAdmin();
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  getColors() {
    this.colorServie.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  getBrandId(brandId: number) {
    this.carService.getBrandId(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getColorId(colorId: number) {
    this.carService.getColorId(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  isAdmin() {
    const token = localStorage.getItem('token');

    if (token) {
      if (!this.roles) {
        try {
          const decoded: any = jwt_decode(token);
          this.roles =
            decoded[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ];

          this.adminCheck = this.roles.includes('admin');
        } catch (error) {}
      }
    }
  }

  DecodeToken(token: string): string {
    return jwt_decode(token);
  }


  deleteDialogVisibleControl(id?: any){
    if(id){
      this.selectedCarId = id;
    }
    this.deleteDialogVisible =!this.deleteDialogVisible;
  }

  delete(){
      this.carService.delete(this.selectedCarId).subscribe((res) => {
        if(res.success){
            this.toastr.info(res.message);
            this.deleteDialogVisible = !this.deleteDialogVisible;
            this.getCars();
        } else {
          this.toastr.error(res.message);
        }
      })
  }

  updateDialogVisibleControl(id?: any){
    if(id){
      this.selectedCarId = id;
    }
    this.updateDialogVisible =!this.updateDialogVisible;
  }
}
