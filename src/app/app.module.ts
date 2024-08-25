import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule}from "@angular/platform-browser/animations" ;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { PayComponent } from './components/pay/pay.component';
import { ToastrModule } from 'ngx-toastr';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { PasswordUpdateComponent } from './components/password-update/password-update.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CarListComponent } from './components/car-list/car-list.component';






@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    NaviComponent,
    CarDetailComponent,
    CarFilterPipe,
    BrandFilterPipe,
    ColorFilterPipe,
    PaymentComponent,
    PayComponent,
    RentalAddComponent,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarDeleteComponent,
    BrandDeleteComponent,
    ColorDeleteComponent,
    CarUpdateComponent,
    BrandUpdateComponent,
    ColorUpdateComponent,
    PasswordUpdateComponent,
    UserUpdateComponent,
    RegisterComponent,
    LoginComponent,
    CarListComponent,
    
    
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right",
  
      
      
    })
   
    
   
  ],
  providers: [[
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ]],
  bootstrap: [AppComponent]
})
export class AppModule { }
