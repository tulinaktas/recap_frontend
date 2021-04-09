import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  searchBrand:string;
  dataLoaded:boolean = false;
  constructor(private brandService:BrandService, private toastrService:ToastrService) { }

  @Output() brandNames= new EventEmitter<string[]>();

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(
      response =>{
        this.brands = response.data
        this.dataLoaded =true
      }
    )
  }
  setCurrentBrand(brand:Brand){
    this.toastrService.show("Lists cars in "+brand.brandName+" brand")
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
