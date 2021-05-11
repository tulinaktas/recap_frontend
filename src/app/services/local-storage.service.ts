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

  addCustomerIdByCurrentUser(customer:Customer){
    localStorage.setItem("customerId",customer.id.toString());
  }

  addCurrentCustomer(user:User){
    localStorage.setItem("currentUser",user.firstName+" "+user.lastName);
    localStorage.setItem("currentUserId",user.id.toString());
    localStorage.setItem("email",user.email);
  }

  removeCurrentCustomer(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("email");
    localStorage.removeItem("customerId")
  }

  getCurrentUser(){
    return localStorage.getItem("currentUser");
  }

  getCustomerId(){
    return localStorage.getItem("customerId");
  }
  
  getCurrentUserEmail(){
    return localStorage.getItem("email");
  }

  getCurrentUserId(){
    return localStorage.getItem("currentUserId");
  }

}
