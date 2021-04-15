import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatDatepickerModule } from '@angular/material/datepicker'  
import { MatNativeDateModule } from '@angular/material/core'  
import { MatFormFieldModule } from '@angular/material/form-field'  
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FilterComponent } from './components/filter/filter.component';
import { ListRentalComponent } from './components/list-rental/list-rental.component';

import { CarSearchPipe } from './pipes/car-search.pipe';
import { ColorSearchPipe } from './pipes/color-search.pipe';
import { BrandSearchPipe } from './pipes/brand-search.pipe';

import {ToastrModule} from "ngx-toastr";
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { CarComponent } from './components/car/car.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    NavbarComponent,
    CarDetailComponent,
    FilterComponent,
    ListRentalComponent,
    CarSearchPipe,
    ColorSearchPipe,
    BrandSearchPipe,
    VatAddedPipe,
    PaymentComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    MatDatepickerModule,  
    MatNativeDateModule,    
    MatFormFieldModule, 
    AppRoutingModule
  ],
  providers: [
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
