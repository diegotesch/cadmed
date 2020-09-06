import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) {
      return "N/A"
    }
    if (value.length == 10) {
      return value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

}
