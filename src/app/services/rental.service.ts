import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponceModel } from '../models/listResponceModel';
import { Rental } from '../models/rental';
import { RentalDetailsDto } from '../models/rentalDetailsDto';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl:string = "https://localhost:44340/api";


  constructor(private httpClient:HttpClient) { }
  getRentals():Observable<ListResponceModel<Rental>>{
    return this.httpClient.get<ListResponceModel<Rental>>(this.apiUrl+"/rentals/getall");
  }


  getRentalsDetail():Observable<ListResponceModel<RentalDetailsDto>>{
    return this.httpClient.get<ListResponceModel<RentalDetailsDto>>(this.apiUrl+"/rentals/getrentaldetails");
  }
}
