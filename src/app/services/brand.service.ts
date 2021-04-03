import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponceModel } from '../models/listResponceModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl:string= "https://localhost:44340/api";
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponceModel<Brand>>{
    return this.httpClient.get<ListResponceModel<Brand>>(this.apiUrl+"/brands/getall");
  }
}
