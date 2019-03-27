import { ValidatorFn, AbstractControl } from '@angular/forms';

export const moneyMininumValidator: ValidatorFn = (control: AbstractControl) => {
    
    if(control.value) {
        let money = control.value.replace(/\D/g, '')
        return money >= 1000 ? null : {moneyMinimumValidator: true}
    }
    else return null
}

export const moneyMaximumValidator: ValidatorFn = (control: AbstractControl) => {
    
    if(control.value) {
        let money = control.value.replace(/\D/g, '')
        return money <= 5000000 ? null : {moneyMaximumValidator: true}
    }
    else return null
}