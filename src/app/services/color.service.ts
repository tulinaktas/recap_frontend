import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponceModel } from '../models/listResponceModel';
import { ResponceModel } from '../models/responceModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl:string = "https://localhost:44340/api/colors/getall";
  constructor(private httpClient:HttpClient) { }
  getColors():Observable<ListResponceModel<Color>>{
    return this.httpClient.get<ListResponceModel<Color>>(this.apiUrl);
  }
}
