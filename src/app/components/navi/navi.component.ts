import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import jwt_decode from "jwt-decode";
import { Subscription, interval } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit, OnDestroy {
  payments: Payment[];
  loginCheck = false;
  adminCheck = false;
  subscription: Subscription
  name = "";
  roles: Array<string>;
  

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private toastrService: ToastrService,
    
  ) { }

  ngOnInit(): void {
   
 this.isAdmin();
 
    this.subscription = interval(500).subscribe(() => {
      this.check();
      this.isAdmin();
    });
    this.getPayments();
   
  }

  ngOnDestroy() {
    // Bileşen yok edildiğinde aboneliği iptal et
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  check() {
    const token = localStorage.getItem('token');

    if (token != null) {
      this.loginCheck = true;
    }
    else
      return;

    if (this.loginCheck) {
      if (!this.name) {
        try {
          const decoded: any = jwt_decode(token);
          this.name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
        } catch (error) {
        }
      }
    }
  }

  DecodeToken(token: string): string {
    return jwt_decode(token);
  }




  isAdmin(){
    const token = localStorage.getItem("token");
    
    if(token){
        if (!this.roles){
          try {
            const decoded : any = jwt_decode(token);
            this.roles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]


            this.adminCheck = this.roles.includes('admin');

          
          }catch (error){ }
        }
    }
  }
 


  getPayments() {
    this.paymentService.getPayments().subscribe((response) => {
      this.payments = response.data;
    })
  }

  logOut() {
    localStorage.removeItem('token')
    this.router.navigateByUrl("login")
    this.loginCheck = false;
    this.adminCheck = false;
    this.name = "";
    this.toastrService.error("Sistemden çıkış yapıldı")
  }

  updateProfile(){
    this.router.navigateByUrl('update')
  }

  updatePassword(){
    this.router.navigateByUrl('updatepassword')
  }

  homePage(){
    this.router.navigateByUrl('');
  }

  carAdd(){
    this.router.navigateByUrl('cars/add');
  }

  brandAdd(){
    this.router.navigateByUrl('brands/add');
  }

  colorAdd(){
    this.router.navigateByUrl('colors/add');
  }

  
}
