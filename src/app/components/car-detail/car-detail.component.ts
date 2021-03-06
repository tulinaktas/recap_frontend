import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailsDto } from 'src/app/models/carDetailsDto';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails:CarDetailsDto = {id:0,brandName:"",carName:"",colorName:"",dailyPrice:0,modelYear:"",imagePath:""};
  carImages:CarImage[];
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService) { }

  ngOnInit(): void {
   this.activatedRoute.params.subscribe(params=>{
     this.getCarDetailsById(params["carId"]);
     this.getCarImageByCarId(params["carId"]);
   })
  }

  getCarDetailsById(carId:number){
    this.carService.getCarDetailById(carId).subscribe(response =>{
        this.carDetails = response.data;
    })
  }

  getCarImageByCarId(carId:number){
    this.carService.getCarImageByCarId(carId).subscribe(response =>{
      this.carImages = response.data;
    })
  }

  getCarousel(image:CarImage){
    if(image != this.carImages[0]){
      return "carousel-item";
    }
    else{
      return "carousel-item active";
    }
  }

}
