import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'brandSearch'
})
export class BrandSearchPipe implements PipeTransform {

  transform(value: Brand[], searchBrand: string):Brand[] {
    searchBrand = searchBrand?searchBrand.toLocaleLowerCase():"";
    return searchBrand?value.filter((b=>b.brandName.toLocaleLowerCase().indexOf(searchBrand)!==-1)):value;
  }

}
