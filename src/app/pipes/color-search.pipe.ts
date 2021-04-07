import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'colorSearch'
})
export class ColorSearchPipe implements PipeTransform {

  transform(value: Color[], searchColor : string): Color[] {
    searchColor = searchColor?searchColor.toLocaleLowerCase():"";
    return searchColor?value.filter(c=>c.colorName.toLocaleLowerCase().indexOf(searchColor)!==-1):value;
  }

}
