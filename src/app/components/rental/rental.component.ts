import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalDetailsDto } from 'src/app/models/rentalDetailsDto';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals:Rental[] = []
  rentalsDetails :RentalDetailsDto[] = []
  dataLoaded:boolean = false;
  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRentalsDetail();
  }
getRentals(){
  this.rentalService.getRentals().subscribe(
    responce =>{
      this.rentals = responce.data
      this.dataLoaded =true
    }
  )
}
getRentalsDetail(){
  this.rentalService.getRentalsDetail().subscribe(
    response =>{
      this.rentalsDetails = response.data
      this.dataLoaded = true
    }
  )
}
}
