import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BankAccountService } from '../core/bank-account/bank-account.service';
import { UserAccountService } from '../core/user-account/user-account.service';
import { BankAccount } from '../core/bank-account/bank-account';
import { Transaction } from '../core/transactions/transaction';
import { LoadingService } from '../shared/components/loading/loading.service';
import { AlertMessageService } from '../shared/components/alert-message/alert-message.service';
import { moneyMininumValidator, moneyMaximumValidator } from '../shared/validators/money/money.validator';
import { DialogLoginToRegisterService } from '../core/header/dialog-login-to-register.service';
import { TransactionService } from '../core/transactions/transaction.service';
import { UserAccountModel } from '../core/user-account/user-account.model';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe'

@AutoUnsubscribe()
@Component({
    templateUrl: './send-money.component.html'
})
export class SendMoneyComponent implements OnInit, OnDestroy {
    
    public formReceiver: FormGroup
    public formAmountSend: FormGroup

    public receiver: BankAccount
    public transaction: Transaction
    public sender: BankAccount

    private user: UserAccountModel

    public accountReceiverFound: boolean = false
    
    constructor(private formBuilder: FormBuilder,
        private bankAccountService: BankAccountService,
        private userService: UserAccountService,
        private loadingService: LoadingService,
        private alertService: AlertMessageService, 
        private dialogService: DialogLoginToRegisterService,
        private transactionService: TransactionService) {}

    ngOnInit() {
        this.formReceiver = this.formBuilder.group({
            nickname: ['', [

            ]],
            agency: ['', [
                Validators.required,
                Validators.maxLength(5)
            ]],
            account: ['', [
                Validators.required,
                Validators.maxLength(13)
            ]],
            account_digit: ['', [
                Validators.required,
                Validators.maxLength(2)
            ]]
        })
        this.formAmountSend = this.formBuilder.group({
            amount: ['', [
                Validators.required,
                moneyMininumValidator,
                moneyMaximumValidator
            ]],
            description: ['', [
                Validators.maxLength(45)
            ]]
        })

        this.userService.userAccount$
            .subscribe(user => {
                this.user = user
                this.bankAccountService.get(user)
                    .subscribe(res => {
                        this.sender = res['bank_account']
                    })
            })
    }

    ngOnDestroy() {}

    public searchReceiver() {
        const agency = this.formReceiver.get('agency').value
        const number = this.formReceiver.get('account').value
        const digit = this.formReceiver.get('account_digit').value

        this.bankAccountService.getByBankAccountNumber(agency, number, digit)
            .subscribe(
                res => {
                    this.receiver = res['bank_account']
                    this.alertService.success('Conta encontrada! Siga em frente.', false)
                    this.accountReceiverFound = true
                }, 
                err => {
                    console.log(err)
                    this.loadingService.stop()
                    if(err.error) this.alertService.danger(err.error.message, false)
                    else this.alertService.warning('Algo está errado, pode ser um problema de conexão. Tente novamente!', false)
                })
    }

    public saveTransfer() {
        this.transaction = {
            status: 'pendente',
            amount: this.formAmountSend.get('amount').value.replace(/[\D]+/g,''),
            description: this.formAmountSend.get('description').value,
            creation_date: new Date(),
            sender: this.sender, 
            receiver: this.receiver
        }
    }

    public transfer() {
        this.transactionService.transfer(this.transaction)
            .subscribe(
                res => {
                    this.bankAccountService.getSubject(this.user)
                    this.alertService.success('Transferência concluída :).', false)
                    this.closeTransferDialog()
                }, 
                err => {
                    console.log(err)
                    this.loadingService.stop()
                    if(err.error) this.alertService.danger(err.error.message, false)
                    else this.alertService.warning('Algo não ocorreu bem. Tente novamente!', false)
                })
    }

    public closeTransferDialog() {
        this.dialogService.closeAllDialogs()
    }

    private currencyRealFormat(value) {
        if(!value) return
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
        this.formAmountSend.get('amount').setValue(this.currencyRealFormat(value))
    }

    public getAccountType(accountType) {
        if(accountType == 'conta_corrente') return 'Conta Corrente'
        if(accountType == 'conta_poupanca') return 'Conta Poupança'
        else return accountType
    }
}