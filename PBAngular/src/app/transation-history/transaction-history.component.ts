import { Component, OnInit, OnDestroy } from "@angular/core";
import * as moment from 'moment'
import { TransactionService } from '../core/transactions/transaction.service';
import { Transaction } from '../core/transactions/transaction';
import { UserAccountService } from '../core/user-account/user-account.service';
import { BankAccountService } from '../core/bank-account/bank-account.service';
import { BankAccount } from '../core/bank-account/bank-account';
import { switchMap } from 'rxjs/operators';
import { LoadingService } from '../shared/components/loading/loading.service';
import { AlertMessageService } from '../shared/components/alert-message/alert-message.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
    templateUrl: './transaction-history.component.html',
    styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit, OnDestroy {

    public transactions: Transaction[]
    public bankInfo: BankAccount

    constructor(private transactionService: TransactionService,
        private userService: UserAccountService,
        private bankAccountService: BankAccountService,
        private loadingService: LoadingService,
        private alertService: AlertMessageService) {}

    ngOnInit() {
        this.userService.getUserAccount()
            .pipe(
                switchMap((user: any) => this.bankAccountService.get(user['user'])), 
                switchMap((res: any) => {
                    const bank = res['bank_account']
                    this.bankInfo = bank
                    return this.transactionService.getHistory(bank.document_number, bank.agency, bank.account, bank.account_digit)
                }))
            .subscribe(
                res => {
                    this.transactions = res['transactions']
                    this.loadingService.stop()
                },
                err => {
                    console.log(err)
                    this.loadingService.stop()
                    if(err.error) {
                        return this.alertService.danger(err.error.message, false)
                    }
                    this.alertService.warning('Alguma coisa não está certa :(. Tente novamente!', false)
                })
    }

    ngOnDestroy() {}

    public formatDate(date: Date) {
        return moment(date, "YYYY-MM-DDTHH:mm:ss.SSSSZ").format('HH:mm DD/MM/YYYY ')
    }

    public formatAmount(value: number) {
        return value.toString().replace(/([0-9]{2})$/g, ",$1")
    }
}