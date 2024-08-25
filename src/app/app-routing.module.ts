import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { PayComponent } from './components/pay/pay.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';
import { BrandComponent } from './components/brand/brand.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { NaviComponent } from './components/navi/navi.component';
import { ColorComponent } from './components/color/color.component';
import { CarListComponent } from './components/car-list/car-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/delete/:carId', component: CarDeleteComponent },
  { path: 'rentals', component: RentalComponent },
  { path: 'getcardetail/:carId', component: CarDetailComponent },
  { path: 'cars/:id', component: CarDetailComponent },
  { path: 'rentals/add/:carId', component: RentalAddComponent },
  { path: 'payments/pay', component: PayComponent },
  { path: 'cars/add', component: CarAddComponent}, //,canActivate:[LoginGuard]},
  { path: 'cars/update/:carId', component: CarUpdateComponent},
  { path: 'cars/brand/update/:brandId', component: BrandUpdateComponent},
  { path: 'cars/color/update/:colorId', component: ColorUpdateComponent},
  { path: 'colors/delete/:colorId', component: ColorDeleteComponent },
  { path: 'payments/getall', component: PaymentComponent },
  { path: 'color-management', component: ColorComponent },
  { path: 'brand-management', component: BrandComponent },
  { path: 'brands/delete/:brandId', component: BrandDeleteComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'brands/list', component: BrandComponent },
  { path: 'update', component: UserUpdateComponent},
  { path: 'cars-management', component: CarListComponent },
  { path: 'brands/add', component: BrandAddComponent},
  { path: 'colors/add', component: ColorAddComponent},


  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
