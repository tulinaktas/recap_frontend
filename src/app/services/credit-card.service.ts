import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl:string = "https://localhost:44340/api";
  
  constructor(private httpClient:HttpClient) { }

  getCreditCardByCustomerId(customerId:number):Observable<SingleResponseModel<CreditCard>>{
    return this.httpClient.get<SingleResponseModel<CreditCard>>(this.apiUrl+"/creditcards/getbycustomerid?id="+customerId);
  }
  
  addCreditCard(creditCard:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/creditcards/add",creditCard);
  }

  updatedCreditCard(creditCard:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/creditcards/update",creditCard);
  }

}
