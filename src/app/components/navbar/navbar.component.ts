import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:string;

  constructor(private authService:AuthService, private userService:UserService, private localStorageService:LocalStorageService) {
  
   }

  ngOnInit(): void {
    this.user = this.localStorageService.getCurrentUser();
  }

  details(){
    
  }

  logOut(){
    this.localStorageService.deleteToken();
    this.localStorageService.removeCurrentCustomer();
  }

  isLogin(){
    if(this.authService.isAuthenticated()){
      return true;
    }else{
      return false;
    }
  }
}
