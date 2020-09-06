import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ngModel][phone]',
  host: {
    '(ngModelChange)': 'onInputChange($event, false)',
    '(keydown.backspace)': 'onInputChange($event.target.value, true)'
  }
})
export class PhoneDirective {

  constructor(public model: NgControl) {}

  onInputChange(event, backspace) {

    if (!event) {
     return
    }
    // remove todos os caracteres nao numéricos
    let newVal = event.replace(/\D/g, '');

    // captura especial necessária caso contrário não é possivel verificar os caracteres não númericos
    if (backspace && newVal.length <= 2) {
      newVal = newVal.substring(0, newVal.length - 1);
    }

    if (newVal.length == 0) {
      newVal = '';
    }

    else if (newVal.length <= 2) {
      newVal = newVal.replace(/^(\d{0,2})/, '($1)');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,4})/, '($1) $2');
    } else if (newVal.length <= 10) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,4})(\d{0,4})/, '($1) $2-$3');
    } else if (newVal.length <= 11){
      newVal = newVal.replace(/^(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/, '($1) $2 $3-$4');
    } else if(newVal.length > 11 && !backspace){
      newVal = newVal.substring(0, (newVal.length -1));
      newVal = newVal.replace(
        /^(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/, '($1) $2 $3-$4');
    }

    this.model.valueAccessor.writeValue(newVal);
  }

}
