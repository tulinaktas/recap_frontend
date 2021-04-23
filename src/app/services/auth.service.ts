import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44340/api";

  email = new EventEmitter<string>();

  constructor(private httpClient:HttpClient) { }

  login(user:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    this.email.emit(user.email);
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"/auth/login",user);
  }

  register(user:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"/auth/register",user);
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }
}
