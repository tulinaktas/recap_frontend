import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponceModel } from '../models/listResponceModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl:string = "https://localhost:44340/api/customers/getall";
  constructor(private httpClient:HttpClient) { }
  getCustomers():Observable<ListResponceModel<Customer>>{
    return this.httpClient.get<ListResponceModel<Customer>>(this.apiUrl);
  }
}
