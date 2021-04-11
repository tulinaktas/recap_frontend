import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
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

  rentals:Rental[] = [];
  customers:Customer[] = [];
  currentCustomerId:number;
  rentDate:Date;
  returnDate:Date;
  rentalsDetails :RentalDetailsDto[] = []
  dataLoaded:boolean = false;

  @Input() car:CarDetailsDto
  rental:Rental;

  constructor(private rentalService:RentalService, private customerService:CustomerService, private router:Router,
    private activatedRoute:ActivatedRoute, private toastrService:ToastrService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  // createRentForm(){
  //   this.rentForm = this.formBuilder.group({
  //     customerId:["",Validators.required],
  //     rentDate:["",Validators.required],
  //     returnDate:["",Validators.required]
  //   })
  // }
  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers =response.data;
    })
  }

  getDate(day: number) {
    var today = new Date();
    today.setDate(today.getDate()+day);
    return today.toISOString().slice(0, 10)
  }
 
  addRent(){
    let addedRental:Rental = {
      carId : this.car.id,
      customerId : parseInt(this.currentCustomerId.toString()),
      rentDate : this.rentDate,
      returnDate : this.returnDate
    }
    console.log(addedRental.rentDate," ");
    this.rentalService.rent(addedRental).subscribe(response =>{
      this.toastrService.success("Başarılı.. Ödeme Sayfasına Yönlendiriliyorsunuz");
      this.router.navigate(["/payment/",JSON.stringify(addedRental)]);
    },responseError=>{
      if(responseError.error.ValidationErrors.length>0)
      for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
        this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Error");        
      }else{
        this.toastrService.error(responseError.error);
      }});
    
    //console.log(JSON.stringify(addedRental))
  }

  setCustomer(customer:Customer){
    return(this.currentCustomerId === customer.id)?true:false;
  }

}
