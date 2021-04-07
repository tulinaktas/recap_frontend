import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FilterComponent } from './components/filter/filter.component';

import { CarSearchPipe } from './pipes/car-search.pipe';
import { ColorSearchPipe } from './pipes/color-search.pipe';
import { BrandSearchPipe } from './pipes/brand-search.pipe';

import {ToastrModule} from "ngx-toastr";

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
    CarSearchPipe,
    ColorSearchPipe,
    BrandSearchPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
