import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetailsDto } from 'src/app/models/carDetailsDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  currentColorId:number;
  currentBrandId:number;
  colors:Color[];
  brands:Brand[];
  cars:CarDetailsDto[];

  constructor(private carService:CarService,private colorService:ColorService, private brandService:BrandService) { }

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
  }
  getColors(){
    this.colorService.getColors().subscribe( response =>{
      this.colors=response.data;
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe( response =>{
      this.brands=response.data;
    })
  }

  setColor(colorId:number){
    return(colorId===this.currentColorId?true:false)
  }
  setBrand(brandId:number){
    return(brandId===this.currentBrandId?true:false)
  }
}
