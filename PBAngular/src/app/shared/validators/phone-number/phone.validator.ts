import { ValidatorFn, AbstractControl } from '@angular/forms';
import { phoneValidation } from './phone-validation';

export const phoneValidator: ValidatorFn = (control: AbstractControl) => {
    const phoneNumber = control.value

    if(phoneNumber) {
        return phoneValidation(phoneNumber) ? null : {phoneValidation: true} 
    } else return null
}