import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailsDto } from 'src/app/models/carDetailsDto';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  totalPrice:number =0;

  rental:Rental={id:0,carId:0,customerId:0,rentDate:null,returnDate:null};
  car:CarDetailsDto={id:0,carName:"",colorName:"",brandName:"",imagePath:"",dailyPrice:0,modelYear:""};
  customer:Customer;
  constructor(private activatedRoute:ActivatedRoute,private carService:CarService,private customerService:CustomerService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['rental']){
        this.rental =JSON.parse(params["rental"])
      }
    })
    this.getCarDetail(this.rental.carId);
    this.getCustomer(this.rental.customerId);
  }

  getCarDetail(carId:number){
    this.carService.getCarDetailById(carId).subscribe(response=>{
      this.car =response.data;
      this.price();
      //console.log(this.car.imagePath)
    })
  }
  getCustomer(id:number){
    this.customerService.getCustomerById(id).subscribe(response=>{
      this.customer=response.data;
    })
  }

  getCarImagePath(car:CarDetailsDto){
    if(car.imagePath){
      return "https://localhost:44340/CarImages/"+car.imagePath
    }
    else{
      return 'https://localhost:44340/CarImages/simge.jpg'
    }
  }

  price(){
    var returnDate = new Date(this.rental.returnDate.toString());
    var rentDate = new Date(this.rental.rentDate.toString());
    var daysCount = returnDate.getTime() - rentDate.getTime();

    var numberOfDays = Math.ceil(daysCount/(1000*3600*24));

    this.totalPrice = numberOfDays * this.car.dailyPrice;
    return this.totalPrice;
  }
}
