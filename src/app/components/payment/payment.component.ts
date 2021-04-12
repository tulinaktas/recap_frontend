import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailsDto } from 'src/app/models/carDetailsDto';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  creditCardForm:FormGroup;

  totalPrice:number=0;

  rental:Rental={id:0,carId:0,customerId:0,rentDate:null,returnDate:null};
  car:CarDetailsDto={id:0,carName:"",colorName:"",brandName:"",imagePath:"",dailyPrice:0,modelYear:""};
  customer:Customer={id:0,companyName:"",userId:0};
  customerCreditCard:CreditCard;

  constructor(
  private activatedRoute:ActivatedRoute,
  private carService:CarService,
  private customerService:CustomerService,
  private rentalService:RentalService,
  private creditCardService:CreditCardService,
  private toastrService:ToastrService,
  private formBuilder:FormBuilder,
  private router:Router
  ) {}

  createCreditCardAddForm(){
    this.creditCardForm = this.formBuilder.group({
      fullName:["",Validators.required],
      cardNumber:["",Validators.required],
      expirationDate:["",Validators.required],
      CVV:["",Validators.required]
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['rental']){
        this.rental =JSON.parse(params["rental"])
      }
    })
    this.getCarDetail(this.rental.carId);
    this.getCustomer(this.rental.customerId);
    this.getCreditCardByCustomerId(this.rental.customerId);

    this.createCreditCardAddForm();
  }

  getCarDetail(carId:number){
    this.carService.getCarDetailById(carId).subscribe(response=>{
      this.car =response.data;
      this.price();
    })
  }
  getCustomer(id:number){
    this.customerService.getCustomerById(id).subscribe(response=>{
      this.customer=response.data;
    })
  }

  getCreditCardByCustomerId(customerId:number){
    this.creditCardService.getCreditCardByCustomerId(customerId).subscribe(response=>{
      this.customerCreditCard = response.data;
    },responseError=>{
      this.toastrService.error(responseError.error.message);
    })
  }

  payment(){
    let creditCard = Object.assign({customerId:this.rental.customerId},this.creditCardForm.value);
    if (this.customerCreditCard != undefined) {
      //ödeme işlemi
    }else{
      this.creditCardService.addCreditCard(creditCard).subscribe(response=>{
        this.rentalService.rent(this.rental).subscribe(response =>{
          //ödeme işlemi
          this.toastrService.success(response.message);
        },responseError =>{
          this.toastrService.error(responseError.error.message);
          this.router.navigate(["/cars/"]);
        })
      })
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

  getCarImagePath(car:CarDetailsDto){
    if(car.imagePath){
      return "https://localhost:44340/CarImages/"+car.imagePath
    }
    else{
      return 'https://localhost:44340/CarImages/simge.jpg'
    }
  }
}
