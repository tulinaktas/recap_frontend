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
  updatedUserCreditCardForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private formBuilder: FormBuilder, 
    private localStorageService:LocalStorageService, 
    private userService:UserService,
    private toastrService:ToastrService,
    private creditCardService:CreditCardService
    )
  {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["user"]) {
        this.user = JSON.parse(params["user"])
      }
    })
      this.getCreditCardByCustomerId();
      this.createUpdatedUserForm();
      this.createUpdatedCreditCardForm();
  }
  
  getCreditCardByCustomerId(){
    let id:number = Number(this.localStorageService.getCustomerId());
    //console.log(id);
    this.creditCardService.getCreditCardByCustomerId(id).subscribe(response=>{
      this.userOfCreditCard = response.data;
      //console.log(this.userOfCreditCard)
    })
  }

   createUpdatedCreditCardForm(){
    this.updatedUserCreditCardForm = this.formBuilder.group({
      fullName : ["", Validators.required],
      cardNumber : ["", Validators.required],
      expirationDate : ["", Validators.required],
      cvv : ["", Validators.required]
    })
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
      //console.log(user);
      this.userService.editUser(user).subscribe(response =>{
        this.toastrService.success(response.message)
      })
    }
  }

  updatedCreditCard(){
    console.log(this.updatedUserCreditCardForm.valid)
    if(this.updatedUserCreditCardForm.valid){
      let creditCard = Object.assign({
        id:this.userOfCreditCard.id, 
        customerId: this.userOfCreditCard.customerId, 
        amount : this.userOfCreditCard.amount
      },this.updatedUserCreditCardForm.value);
      this.creditCardService.updatedCreditCard(creditCard).subscribe(response =>{
        this.toastrService.info(response.message)
      })
      // console.log(creditCard)
  }else{
    this.toastrService.error("Information is missing, please try again")
  }
}
}
