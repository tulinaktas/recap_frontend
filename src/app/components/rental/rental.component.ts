import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { ActivatedRoute, RouteConfigLoadEnd, Router } from '@angular/router';
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
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
    })
  }
  getParseDate(date:Date){
    return JSON.parse(date.toString())
  }
  addRent() {
    // let addedRental:Rental = {
    //   carId : this.car.id,
    //   customerId : parseInt(this.currentCustomerId.toString()),
    //   rentDate: getParse(rentDate),
    //   returnDate: this.returnDate
    // }
    if (this.currentCustomerId != undefined) {
      let addedRental = Object.assign({ carId: this.car.id }, { customerId: parseInt(this.currentCustomerId.toString()) }, this.rangeFormGroup.value);
      if (this.rangeFormGroup.valid) {
        this.rentalService.rent(addedRental).subscribe(response => {
          this.toastrService.success(response.message);
          this.router.navigate(["/payment/", JSON.stringify(addedRental)]);
        }
        , responseError => {
            this.toastrService.error(responseError.error.message)
          });
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
