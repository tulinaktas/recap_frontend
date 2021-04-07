import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailsDto } from '../models/carDetailsDto';

@Pipe({
  name: 'carSearch'
})
export class CarSearchPipe implements PipeTransform {

  transform(value: CarDetailsDto[], searchCar:string): CarDetailsDto[] {
    searchCar = searchCar?searchCar.toLocaleLowerCase():"";
    return searchCar?value.filter(c=>c.carName.toLocaleLowerCase().indexOf(searchCar)!==-1):value;
  }

}
