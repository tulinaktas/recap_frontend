import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetailsDto } from 'src/app/models/carDetailsDto';
import { ListResponceModel } from '../models/listResponceModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl:string = "https://localhost:44340/api";

  constructor(private httpClient:HttpClient) { }
  getCar():Observable<ListResponceModel<Car>>{
    return this.httpClient.get<ListResponceModel<Car>>(this.apiUrl+"/cars/getall");
  }

  getCarsDetail():Observable<ListResponceModel<CarDetailsDto>>{
    return this.httpClient.get<ListResponceModel<CarDetailsDto>>(this.apiUrl+"/cars/getcarsdetails");
  }
  getCarsByColor(colorId:number):Observable<ListResponceModel<CarDetailsDto>>{
    return this.httpClient.get<ListResponceModel<CarDetailsDto>>(this.apiUrl+"/cars/getcarsdetailbycolorid?colorId="+colorId);
  }
  getCarsByBrand(brandId:number):Observable<ListResponceModel<CarDetailsDto>>{
    return this.httpClient.get<ListResponceModel<CarDetailsDto>>(this.apiUrl+"/cars/getcarsdetailbybrandid?brandId="+brandId);
  }
}
