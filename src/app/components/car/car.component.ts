import { Component, OnInit } from '@angular/core';
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
  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getCarsDetail();
  }

  getCars(){
    this.carService.getCar().subscribe(
      responce =>{
        this.cars = responce.data
      }
    )
  }
  getCarsDetail(){
    this.carService.getCarsDetail().subscribe(
      responce =>{
        this.carsDetail =responce.data
      }
    )
  }
}
