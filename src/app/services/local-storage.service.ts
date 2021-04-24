import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addToken(token:TokenModel){
    localStorage.setItem("token",token.token);
    localStorage.setItem("expiration",token.expiration);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  deleteToken(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  addCurrentCustomer(user:User){
    localStorage.setItem("currentUser",user.firstName+" "+user.lastName);
  }

  removeCurrentCustomer(){
    localStorage.removeItem("currentUser");
  }

  getCurrentUser(){
    return localStorage.getItem("currentUser");
  }
}
