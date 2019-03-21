import { AbstractControl } from '@angular/forms';
import { CPFValidate } from './CPFValidate';

export function cpfValidator(control: AbstractControl) {
  if(control.value) {
    return CPFValidate(control.value) ? null : {cpfValidate: true}
  } else return null
}