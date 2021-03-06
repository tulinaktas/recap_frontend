import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetailsDto } from 'src/app/models/carDetailsDto';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarDetailComponent } from '../car-detail/car-detail.component';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[];
  carsDetail:CarDetailsDto[];
  dataLoaded:boolean=false;
  currentCar:CarDetailsDto;
  car:CarDetailsDto;

  searchCar:string;
  searchColor:string;
  searchBrand:string;

  colorNames:string[];
  brandNames:string[];

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        if (params["colorId"]&&params["brandId"]) {
          this.getCarsByColorAndBrand(params["colorId"],params["brandId"])
        }
         else if(params["colorId"]){
            this.getCarsByColorId(params["colorId"])
          }
          else if(params["brandId"]){
            this.getCarsByBrandId(params["brandId"])
          }
          else{
            this.getCarsDetail()
          }
      })
  }

  getCars(){
    this.carService.getCar().subscribe(
      response =>{
        this.cars = response.data
        this.dataLoaded = true
      }
    )
  }
  getCarsDetail(){
    this.carService.getCarsDetail().subscribe(
      response =>{
        this.carsDetail =response.data
        this.dataLoaded = true
      }
    )
  }
  getCarsByColorId(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(
      response => {
        this.carsDetail=response.data;
        this.dataLoaded = true
      }
    )
  }

  getCarsByBrandId(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(
      response => {
        this.carsDetail=response.data;
        this.dataLoaded = true
      }
    )
  }
  getCarsByColorAndBrand(colorId:number,brandId:number){
    this.carService.getCarsByColorAndBrand(colorId,brandId).subscribe(response=>{
      this.carsDetail=response.data;
      this.dataLoaded = true;
    })
  }

  setCurrentCar(car:CarDetailsDto){
    this.toastrService.show("Redirects to "+car.brandName+" detail page")
    this.currentCar = car;    
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
