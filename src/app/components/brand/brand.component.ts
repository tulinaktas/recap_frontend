import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  currentBrand:Brand;
  brands:Brand[] =[]
  dataLoaded:boolean = false;
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(
      responce =>{
        this.brands = responce.data
        this.dataLoaded =true
      }
    )
  }
  getCurrentBrand(brand:Brand){
    this.currentBrand=brand
}
  getCurrentBrandClass(brand:Brand){
    if(this.currentBrand==brand){
      return "list-group-item list-group-item-action active";
    }
    else{
      return "list-group-item list-group-item-action";
    }
  }
}
