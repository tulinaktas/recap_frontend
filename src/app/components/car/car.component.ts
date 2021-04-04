import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetailsDto } from 'src/app/models/carDetailsDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[] =[]
  carsDetail:CarDetailsDto[] =[]
  dataLoaded:boolean=false;
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
          if(params["colorId"]){
            this.getCarsByColorId(params["colorId"])
          }
          else if(params["brandId"]){
            this.getCarsByBrandId(params["brandId"])
          }
          else{
            this.getCarsDetail()
          }
      }
    )
    this.getCarsDetail();
  }

  getCars(){
    this.carService.getCar().subscribe(
      responce =>{
        this.cars = responce.data
        this.dataLoaded = true
      }
    )
  }
  getCarsDetail(){
    this.carService.getCarsDetail().subscribe(
      responce =>{
        this.carsDetail =responce.data
        this.dataLoaded = true
      }
    )
  }
  getCarsByColorId(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(
      responce => {
        this.carsDetail=responce.data;
      }
    )
  }

  getCarsByBrandId(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(
      responce => {
        this.carsDetail=responce.data;
      }
    )
  }
}
