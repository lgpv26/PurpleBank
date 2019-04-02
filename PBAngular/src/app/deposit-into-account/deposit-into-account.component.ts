import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { moneyMininumValidator, moneyMaximumValidator } from '../shared/validators/money/money.validator';
import { UserAccountService } from '../core/user-account/user-account.service';
import { UserAccountModel } from '../core/user-account/user-account.model';
import { BankAccount } from '../core/bank-account/bank-account';
import { BankAccountService } from '../core/bank-account/bank-account.service';
import { TransactionService } from '../core/transactions/transaction.service';
import { Transaction } from '../core/transactions/transaction';
import { LoadingService } from '../shared/components/loading/loading.service';
import { AlertMessageService } from '../shared/components/alert-message/alert-message.service';
import { DialogLoginToRegisterService } from '../core/header/dialog-login-to-register.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe'
import { switchMap, concatMap } from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
    selector: 'pb-deposit-into-account',
    templateUrl: './deposit-into-account.component.html',
    styleUrls: ['./deposit-into-account.component.css']
})
export class DepositIntoAccountComponent implements OnInit, OnDestroy {

    public depositForm: FormGroup
    public userAccountInfo: UserAccountModel

    constructor(private formBuilder: FormBuilder,
        private userAccountService: UserAccountService,
        private bankAccountService: BankAccountService,
        private transactionService: TransactionService,
        private loadingService: LoadingService,
        private alertService: AlertMessageService,
        private dialogService: DialogLoginToRegisterService) {}

    ngOnInit() {
        this.depositForm = this.formBuilder.group({
            amount: ['', [
                Validators.required,
                moneyMininumValidator,
                moneyMaximumValidator
            ]]
        })
    }

    ngOnDestroy() {}

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
        this.depositForm.get('amount').setValue(this.currencyRealFormat(value))
    }

    public deposit(form: FormGroup) {
        let amount = form.get('amount').value
        const transaction: Transaction | any = {
            status: 'pago',
            amount: parseInt(amount.replace(',', '').replace('.', '')),
            creation_date: new Date()
        } 
        this.userAccountService.getUserAccount()
            .pipe(
                concatMap(res => {
                    this.userAccountInfo = res['user']
                    return this.bankAccountService.get(res['user'])
                }),
                concatMap(res => this.transactionService.deposit(res['bank_account'], transaction)))
            .subscribe(
                res => {
                    this.bankAccountService.getSubject(this.userAccountInfo)
                    this.alertService.success('Deposito realizado com sucesso!', false)
                    this.loadingService.stop()
                    this.dialogService.closeAllDialogs()
                },
                err => {
                    console.log(err)
                    this.loadingService.stop()
                    if(err.error) this.alertService.danger(err.error.message, false)
                    else this.alertService.warning('Algo deu errado. Tente novamente!', false)
                })
    }

}