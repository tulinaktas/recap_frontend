import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  currentColor:Color;
  colors:Color[] = [];
  searchColor:string;
  dataLoaded:boolean =false;

  @Output() colorNames = new EventEmitter<string[]>(); 
  constructor(private colorService:ColorService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getColors();
  }
  getColors(){
  this.colorService.getColors().subscribe(
    response =>{
      this.colors = response.data
      this.dataLoaded =true
    }
  )
  }
setCurrentColor(color:Color){
  this.toastrService.show("Lists cars in "+color.colorName);
  this.currentColor=color;
}

getCurrentColorClass(color:Color){
  if(this.currentColor==color){
    return "list-group-item list-group-item-action active";
  }
  else{
    return "list-group-item list-group-item-action";
  }
}
getAllCarsClass(){
  if(!this.currentColor){
    return "list-group-item active"
   }
   else{
    return "list-group-item"
   }
}
}
