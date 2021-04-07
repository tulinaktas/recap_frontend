import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetailsDto } from 'src/app/models/carDetailsDto';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CarImage } from '../models/carImage';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl:string = "https://localhost:44340/api";

  constructor(private httpClient:HttpClient) { }
  getCar():Observable<ListResponseModel<Car>>{
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl+"/cars/getall");
  }

  getCarsDetail():Observable<ListResponseModel<CarDetailsDto>>{
    return this.httpClient.get<ListResponseModel<CarDetailsDto>>(this.apiUrl+"/cars/getcarsdetails");
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetailsDto>>{
    return this.httpClient.get<ListResponseModel<CarDetailsDto>>(this.apiUrl+"/cars/getcarsdetailbycolorid?colorId="+colorId);
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetailsDto>>{
    return this.httpClient.get<ListResponseModel<CarDetailsDto>>(this.apiUrl+"/cars/getcarsdetailbybrandid?brandId="+brandId);
  }
  getCarDetailById(carId:number):Observable<SingleResponseModel<CarDetailsDto>>{
    return this.httpClient.get<SingleResponseModel<CarDetailsDto>>(this.apiUrl+"/cars/getcardetailsbyid?carId="+carId);
  }
  getCarImageByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl+"/carimages/getphotosbycarid?carId="+carId);
  }
  getCarImages():Observable<ListResponseModel<CarImage>>{
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl+"/carimages/getall");
  }
}
