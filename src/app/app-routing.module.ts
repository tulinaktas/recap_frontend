import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ListRentalComponent } from './components/list-rental/list-rental.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
{path:"", pathMatch:"full", component:CarComponent},
{path:"cars",component:CarComponent},
{path:"rentals",component:ListRentalComponent},
{path:"customers",component:CustomerComponent},
{path:"colors",component:ColorComponent},
{path:"brands",component:BrandComponent},
{path:"cars/color/:colorId",component:CarComponent},
{path:"cars/brand/:brandId",component:CarComponent},
{path:"car-detail/:carId",component:CarDetailComponent},
{path:"cars/car-detail/:carId",component:CarDetailComponent},
{path:"filter/:colorId/:brandId",component:CarComponent},
{path:"payment/:rental",component:PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
