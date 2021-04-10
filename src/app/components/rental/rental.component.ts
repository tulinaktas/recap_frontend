import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadEnd, Router } from '@angular/router';
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

  rentals:Rental[] = [];
  customers:Customer[] = [];
  currentCustomerId:number;
  rentDate:Date;
  returnDate:Date;
  rentalsDetails :RentalDetailsDto[] = []
  dataLoaded:boolean = false;

  @Input() car:CarDetailsDto
  rental:Rental;

  constructor(private rentalService:RentalService, private customerService:CustomerService, private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers =response.data;
    })
  }

  addRent(){
    let addedRental:Rental = {
      carId : this.car.id,
      customerId : this.currentCustomerId,
      rentDate : this.rentDate,
      returnDate : this.returnDate
    }
    this.router.navigate(["/payment/",JSON.stringify(addedRental)])
    //console.log(JSON.stringify(addedRental))
  }

  
  // calculateTotalPrice(dailyPrice:number):number{
  //   return (this.returnDate.getDate()-this.rentDate.getDate())*dailyPrice;
  // }

  
  setCustomer(customer:Customer){
    return(this.currentCustomerId === customer.id)?true:false;
  }

}
