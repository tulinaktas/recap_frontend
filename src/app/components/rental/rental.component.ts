import { DatePipe, formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { ActivatedRoute, RouteConfigLoadEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailsDto } from 'src/app/models/carDetailsDto';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalDetailsDto } from 'src/app/models/rentalDetailsDto';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals: Rental[] = [];
  customer: Customer ={id:0,userId:0,companyName:""};
  rentalsDetails: RentalDetailsDto[] = []
  dataLoaded: boolean = false;

  @Input() car: CarDetailsDto;

  today = new Date();

  rangeFormGroup = new FormGroup({
    rentDate: new FormControl("", Validators.required),
    returnDate: new FormControl("", Validators.required)
  })

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private toastrService: ToastrService,
    private localStroageService:LocalStorageService) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    let id:number = Number(this.localStroageService.getCurrentUserId())
    this.customerService.getCustomerByUserId(id).subscribe(response => {
      this.customer = response.data;
      this.localStroageService.addCustomerIdByCurrentUser(this.customer);
    })
  }
 
  addRent() {
    if(this.customer){
      let addedRental = {
        carId: this.car.id, 
        customerId: this.customer.id,
        rentDate: this.getDate(this.rangeFormGroup.value.rentDate), 
        returnDate: this.getDate(this.rangeFormGroup.value.returnDate)
      };

      if (this.rangeFormGroup.valid) {
        this.router.navigate(["/payment/", JSON.stringify(addedRental)]);
      } else {
        this.toastrService.error("Information is missing");
      }
    }else{
      this.toastrService.error("You must to login or register");
      this.router.navigate(["/login/"]);
    }
  }

  getDate(date:Date):Date{
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  }

}
