import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: import("@angular/forms").FormControl, form: import("@angular/forms").FormGroupDirective | import("@angular/forms").NgForm): boolean {
        const isSubmitted = form && form.submitted
        //if(control.dirty && !control.invalid) return true
        return !!(isSubmitted);
    }

}