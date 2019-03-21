import { FormGroup, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (formGroup: FormGroup) => {
    let password = formGroup.get('password').value
    let password2 = formGroup.get('confirmPassword').value

    if(password + password2) {
        return password !== password2 ? {confirmPassword: true} : null
    } else {
        return null
    }
}