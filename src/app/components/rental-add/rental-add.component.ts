import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.createRentalAddForm();
  }

  createRentalAddForm(){
    this.rentalAddForm=this.formBuilder.group({
      carId:["",Validators.required],
      rentDate:["",Validators.required],
      returnDate:["",Validators.required],       
    });
  }
  add() {
    if(this.rentalAddForm.valid){
      let rentalModel= Object.assign({},this.rentalAddForm.value)
      this.rentalService.add(rentalModel).subscribe(response =>{
        console.log(response)
        this.toastrService.success("Ürün Eklendi","Başaarılıı")
        this.router.navigate(["/payments/pay"])
      })
      
    }else{
      this.toastrService.error("Tüm Alanları Doldurunuz","Dikkat")
    }
       
     
  }



}
