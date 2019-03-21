import { ValidatorFn, AbstractControl } from '@angular/forms';

export const moneyMininumValidator: ValidatorFn = (control: AbstractControl) => {
    let money = control.value.replace(/\D/g, '')
    let centavos = money.substring(money.length - 2)
    let moneyWithoutCentavos = money.replace(centavos, '')

    if(control.value) return moneyWithoutCentavos >= 10 && money.length >= 2 ? null : {moneyMinimumValidator: true}
    else return null
}

export const moneyMaximumValidator: ValidatorFn = (control: AbstractControl) => {
    let money = control.value.replace(/\D/g, '')
    let centavos = money.substring(money.length - 2)
    let moneyWithoutCentavos = money.replace(centavos, '')

    if(control.value) return moneyWithoutCentavos <= 50000 ? null : {moneyMaximumValidator: true}
    else return null
}