import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserAccountService } from '../core/user-account/user-account.service';
import { UserAccountModel } from '../core/user-account/user-account.model';
import { DialogLoginToRegisterService } from '../core/header/dialog-login-to-register.service';
import { DepositIntoAccountComponent } from '../deposit-into-account/deposit-into-account.component';
import { BankAccountService } from '../core/bank-account/bank-account.service';
import { BankAccount } from '../core/bank-account/bank-account';
import { LoadingService } from '../shared/components/loading/loading.service';
import { AlertMessageService } from '../shared/components/alert-message/alert-message.service';
import { SendMoneyComponent } from '../send-money/send-money.component';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe'

@AutoUnsubscribe()
@Component({
    templateUrl: './interface-account.component.html',
    styleUrls: ['./interface-account.component.css']
})
export class InterfaceAccountComponent implements OnInit, OnDestroy {

    public userAccountInformations: UserAccountModel
    public userBankAccountInformations: BankAccount
    public userHasBankAccount: boolean = false

    public bank$ = this.bankAccountService.bank$

    public showBalance: boolean = false
    
    constructor(private userAccountService: UserAccountService,
        private dialogService: DialogLoginToRegisterService,
        private bankAccountService: BankAccountService,
        private loadingService: LoadingService,
        private alertService: AlertMessageService) {}

    ngOnInit() {
        this.userAccountService.getUserAccount()
            .subscribe(
                (res) => {
                    this.userAccountInformations = res['user']
                    this.getBankAccount()
                    this.bankAccountService.getSubject(this.userAccountInformations)
                },
                (err) => {
                    console.log(err)
                    this.loadingService.stop()
                })
    }

    ngOnDestroy() {}

    public openDepositIntoAccount() {
        this.dialogService.openDialog(DepositIntoAccountComponent)
    }

    public openSendMoney() {
        this.dialogService.closeAllDialogs()
        this.dialogService.openDialog(SendMoneyComponent)
    }

    public createBankAccount() {
        this.bankAccountService.create(this.userAccountInformations)
            .subscribe(
                res => {
                    this.getBankAccount()
                    this.alertService.success('Parabens! Agora você tem uma PurpleConta.', false)
                },
                err => {
                    console.log(err)
                    this.loadingService.stop()
                    if(err.error) this.alertService.danger(err.error.message, false)
                    this.alertService.warning('Tem alguma coisa errada :(. Tente novamente!', false)
                })
    }

    public getBankAccount() {
        this.bankAccountService.get(this.userAccountInformations)
            .subscribe(
                res => {
                    this.userBankAccountInformations = res['bank_account']
                    this.userHasBankAccount = true
                },
                err => {
                    console.log(err)
                    this.loadingService.stop()
                })
    }

    public getAccountType(accountType: string) {
        if(accountType == 'conta_corrente') return 'CC'
        if(accountType == 'conta-poupanca') return 'CP'
    }

    public balanceFormat(number: number) {
        if(number == 0) return number

        let centavos = number
            .toString()
            .substring(number.toString().length - 2)

        let withoutCentavos = number
            .toString()
            .substring(0, number.toString().length - 2)

        return `${withoutCentavos},${centavos}`
    }

    public toggleBalance() {
        this.showBalance = !this.showBalance
    }
}