import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetailsDto } from '../models/rentalDetailsDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl:string = "https://localhost:44340/api";


  constructor(private httpClient:HttpClient) { }
  getRentals():Observable<ListResponseModel<Rental>>{
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+"/rentals/getall");
  }


  getRentalsDetail():Observable<ListResponseModel<RentalDetailsDto>>{
    return this.httpClient.get<ListResponseModel<RentalDetailsDto>>(this.apiUrl+"/rentals/getrentaldetails");
  }

  rent(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/rentals/add", rental);
  }
}
