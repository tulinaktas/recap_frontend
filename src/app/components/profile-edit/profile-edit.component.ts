import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { User } from 'src/app/models/user';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  user: User;
  userOfCreditCard:CreditCard;

  updatedUserForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private formBuilder: FormBuilder, 
    private localStorage:LocalStorageService, 
    private userService:UserService,
    private toastrService:ToastrService,
    private creditCardService:CreditCardService
    )
  {}

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {
      if (params["user"]) {
        this.user = JSON.parse(params["user"])
        this.userOfCreditCard
      }
    })
      this.createUpdatedUserForm();
  }
  
  createUpdatedUserForm() {
    this.updatedUserForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email,Validators.required],
      password: ["",Validators.required]
    })
  }

  updatedUser() {
    if (this.updatedUserForm.valid) {
      let user = Object.assign({id: this.user.id}, this.updatedUserForm.value);
      console.log(user);
      this.userService.editUser(user).subscribe(response =>{
        this.toastrService.success(response.message)
      })
    }
  }
}
