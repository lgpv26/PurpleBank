import { Component, OnInit } from "@angular/core";
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

@Component({
    selector: 'pb-deposit-into-account',
    templateUrl: './deposit-into-account.component.html',
    styleUrls: ['./deposit-into-account.component.css']
})
export class DepositIntoAccountComponent implements OnInit {

    public depositForm: FormGroup
    public userAccountInfo: UserAccountModel
    public userBankAccountInfo: BankAccount

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

    //deposita na conta (diminuir esse encapsulamento no futuro)
    public deposit(form: FormGroup) {
        let amount = form.get('amount').value
        const transaction: Transaction = {
            status: 'pago',
            amount: parseInt(amount.replace(',', '').replace('.', '')),
            creation_date: new Date()
        } 
        this.userAccountService.getUserAccount()
            .subscribe(
                res => {
                    this.userAccountInfo = res['user']
                    this.bankAccountService.get(this.userAccountInfo)
                        .subscribe(
                            bankObject => {
                                this.userBankAccountInfo = bankObject['bank_account']
                                this.transactionService.deposit(this.userAccountInfo, this.userBankAccountInfo, transaction)
                                    .subscribe(
                                        _ => {
                                            this.bankAccountService.getSubject(this.userAccountInfo)
                                            this.alertService.success(`Valor depositado com sucesso!`, false)
                                            this.dialogService.closeAllDialogs()
                                        },
                                        err => {
                                            console.log(err)
                                            this.loadingService.stop()
                                            if(err.error) this.alertService.danger(err.error.message, false)
                                            else this.alertService.warning('Algo deu errado. Tente novamente!', false)
                                        })
                            },
                            err => {
                                console.log(err)
                                this.loadingService.stop()
                                if(err.error) this.alertService.danger(err.error.message, false)
                                else this.alertService.warning('Algo deu errado. Tente novamente!', false)
                            }
                        )
                },
                err => {
                    console.log(err)
                    this.loadingService.stop()
                    if(err.error) this.alertService.danger(err.error.message, false)
                    else this.alertService.warning('Algo deu errado. Tente novamente!', false)
                })
    }

}