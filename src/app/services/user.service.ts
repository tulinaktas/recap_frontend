import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  apiUrl:string= "https://localhost:44340/api";

  constructor(private httpClient:HttpClient) { }

  getByEmail(email:string):Observable<SingleResponseModel<User>>{
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl+"/users/getuserbyemail?email="+email);
  }

  editUser(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/users/edit",user);
  }
  
}
