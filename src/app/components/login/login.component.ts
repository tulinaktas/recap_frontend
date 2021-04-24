import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  registerForm:FormGroup;

  user:User;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService, 
    private router:Router, 
    private localStorageService:LocalStorageService, 
    private userService:UserService
    ) { }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email : ["",Validators.required],
      password : ["",Validators.required]
    })
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName : ["",Validators.required],
      lastName : ["",Validators.required],
      email : ["",Validators.required],
      password : ["",Validators.required]
    })
  }

  ngOnInit(): void {

    this.createLoginForm();
    this.createRegisterForm();
  }

    
  getUser(email:string){
    this.userService.getByEmail(email).subscribe(response=>{
      this.user = response.data;
      this.localStorageService.addCurrentCustomer(this.user);
    })
  }

  login(){
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      let user = Object.assign(this.loginForm.value);
      console.log(user)
      this.authService.login(user).subscribe(response=>{
        console.log(response.data)
        this.toastrService.success(response.message);
        this.getUser(user.email);
        this.localStorageService.addToken(response.data);
        this.router.navigate(["/cars"])
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
  }
  
  register(){
    if(this.registerForm.valid){
      let user = Object.assign(this.registerForm.value);
      this.authService.register(user).subscribe(response=>{
        this.toastrService.success(response.message);
        this.localStorageService.addToken(response.data);
      },responseError=>{
        this.toastrService.error(responseError.error);
      })
    }
  }
  
}
