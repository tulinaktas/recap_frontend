import { DatePipe, formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { ActivatedRoute, RouteConfigLoadEnd, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CarDetailsDto } from 'src/app/models/carDetailsDto';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalDetailsDto } from 'src/app/models/rentalDetailsDto';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals: Rental[] = [];
  customers: Customer[] = [];
  currentCustomerId: number;
  rentalsDetails: RentalDetailsDto[] = []
  dataLoaded: boolean = false;

  @Input() car: CarDetailsDto;

  today = new Date();
  

  rangeFormGroup = new FormGroup({
    rentDate: new FormControl("", Validators.required),
    returnDate: new FormControl("", Validators.required)
  })


  constructor(
    private rentalService: RentalService,
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
    })
  }
 

  addRent() {
     console.log(this.rangeFormGroup.value.rentDate.toUTCString());
     console.log(this.rangeFormGroup.value.rentDate.toLocaleDateString());
     console.log(this.rangeFormGroup.value.rentDate.toLocaleString());
     console.log(this.rangeFormGroup.value.rentDate.toLocaleTimeString());
     console.log(this.rangeFormGroup.value.rentDate.toString());
     console.log(this.rangeFormGroup.value.rentDate.toTimeString());
    // this.rangeFormGroup.value.rentDate = moment.utc(this.rangeFormGroup.value.rentDate).format()
    // this.rangeFormGroup.value.returnDate = moment.utc(this.rangeFormGroup.value.returnDate).format()
    if (this.currentCustomerId != undefined) {
      let addedRental = Object.assign({ carId: this.car.id},{ customerId: parseInt(this.currentCustomerId.toString())}, this.rangeFormGroup.value);
      console.log(addedRental.rentDate);
      if (this.rangeFormGroup.valid) {
        // this.rentalService.rent(addedRental).subscribe(response => {
        //   this.toastrService.success(response.message);
      
        // }
        // , responseError => {
        //     this.toastrService.error(responseError.error.message)
        //   });
        this.router.navigate(["/payment/", JSON.stringify(addedRental)]);
      } else {
        this.toastrService.error("Information is missing");
      }
    } else {
      this.toastrService.error("Information is missing");
    }
  }

  setCustomer(customer: Customer) {
    return (this.currentCustomerId === customer.id) ? true : false;
  }

}
