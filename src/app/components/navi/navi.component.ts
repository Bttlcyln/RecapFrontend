import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(
    private router:Router,
    private paymentService:PaymentService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
   
  }


  

}
