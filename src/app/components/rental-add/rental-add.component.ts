import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css']
})
export class RentalAddComponent implements OnInit {
  rentalAddForm: FormGroup;
  carId: number;

  constructor(
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = params['carId'];
      }
    });
    this.createRentalAddForm();
  }

  createRentalAddForm(){
    this.rentalAddForm=this.formBuilder.group({
      rentDate:["",Validators.required],
      returnDate:["",Validators.required],       
    });
  }
  add() {
    if(this.rentalAddForm.valid){
      let rentalModel= Object.assign({},this.rentalAddForm.value)
      rentalModel.carId = Number(this.carId);
      
      this.rentalService.add(rentalModel).subscribe(response =>{
        this.toastrService.success("Ürün Eklendi","Başaarılıı")
        this.router.navigate(["/payments/pay"]);
      },(errorResponse)=>{
        const errorMessage = errorResponse.error.message || "Bir hata oluştu"
        this.toastrService.error(errorResponse.error.message,"Hata");
      }
    );
      
      
    }else{
      this.toastrService.error("Tüm Alanları Doldurunuz","Dikkat")
    }
       
     
  }



}
