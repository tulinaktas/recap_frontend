import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailsDto } from 'src/app/models/carDetailsDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails:CarDetailsDto;
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
   this.activatedRoute.params.subscribe(params=>{
     this.getCarDetailsById(params["carId"])
   })
  }

  getCarDetailsById(carId:number){
    this.carService.getCarDetailById(carId).subscribe(response =>{
        this.carDetails = response.data;
    })
  }

}
