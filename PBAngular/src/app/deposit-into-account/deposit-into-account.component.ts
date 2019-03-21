import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { moneyMininumValidator, moneyMaximumValidator } from '../shared/validators/money/money.validator';
import { UserAccountService } from '../core/user-account/user-account.service';

@Component({
    selector: 'pb-deposit-into-account',
    templateUrl: './deposit-into-account.component.html',
    styleUrls: ['./deposit-into-account.component.css']
})
export class DepositIntoAccountComponent implements OnInit {

    public depositForm: FormGroup

    constructor(private formBuilder: FormBuilder,
        private userAccountService: UserAccountService) {}

    ngOnInit() {
        this.depositForm = this.formBuilder.group({
            value: ['', [
                Validators.required,
                moneyMininumValidator,
                moneyMaximumValidator
            ]]
        })
    }

    private currencyRealFormat(value) {
        var valueFormat = value;

        if(!valueFormat.length) return valueFormat

        valueFormat = valueFormat + '';
        valueFormat = parseInt(valueFormat.replace(/[\D]+/g,''));
        valueFormat = valueFormat + '';
        if(valueFormat.length > 2) valueFormat = valueFormat.replace(/([0-9]{2})$/g, ",$1");
      
        if (valueFormat.length > 6) {
            valueFormat = valueFormat.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
        value = valueFormat;
        return value
    }

    public updateValue(value) {
        this.depositForm.get('value').setValue(this.currencyRealFormat(value))
    }

    public deposit(form: FormGroup) {
        let valueToDeposit = form.get('value').value
        this.userAccountService.getUserAccount().subscribe(res => console.log(res))
        console.log(valueToDeposit)
    }

}