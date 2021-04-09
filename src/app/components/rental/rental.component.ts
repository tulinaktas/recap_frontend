import { Component, Input, OnInit } from '@angular/core';
import { CarDetailsDto } from 'src/app/models/carDetailsDto';
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

  @Input() car:CarDetailsDto


  constructor(private rentalService:RentalService) { }

  
 
  ngOnInit(): void {
  }
 
}
