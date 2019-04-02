import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { UserAccountService } from '../core/user-account/user-account.service';
import { UserAccountModel } from '../core/user-account/user-account.model';
import { DialogLoginToRegisterService } from '../core/header/dialog-login-to-register.service';
import { DepositIntoAccountComponent } from '../deposit-into-account/deposit-into-account.component';
import { BankAccountService } from '../core/bank-account/bank-account.service';
import { LoadingService } from '../shared/components/loading/loading.service';
import { AlertMessageService } from '../shared/components/alert-message/alert-message.service';
import { SendMoneyComponent } from '../send-money/send-money.component';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe'
import { TransactionHistoryComponent } from '../transation-history/transaction-history.component';
import { concatMap } from 'rxjs/operators';
import { ContactsComponent } from '../contacts/contacts.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@AutoUnsubscribe()
@Component({
    templateUrl: './interface-account.component.html',
    styleUrls: ['./interface-account.component.css']
})
export class InterfaceAccountComponent implements OnInit, OnDestroy {

    public userAccountInformations: UserAccountModel
    public userHasBankAccount: boolean = false

    public bank$ = this.bankAccountService.bank$

    public showBalance: boolean = false
    public formProfileImage: FormGroup
    public img: File

    constructor(private userAccountService: UserAccountService,
        private dialogService: DialogLoginToRegisterService,
        private bankAccountService: BankAccountService,
        private loadingService: LoadingService,
        private alertService: AlertMessageService,
        private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.formProfileImage = this.formBuilder.group({
            img: ['', Validators.required]
        })

        this.refreshUserAndBankAccount()
    }

    ngOnDestroy() {}

    public refreshUserAndBankAccount() {
        this.userAccountService.getUserAccount()
            .pipe(
                concatMap(res => {
                    const user = res['user']
                    this.userAccountInformations = user
                    return this.bankAccountService.get(user)
                }))
            .subscribe(
                res => {
                    //this.bankAccountService.getSubject(this.userAccountInformations)
                    this.userHasBankAccount = true
                },
                err => {
                    this.loadingService.stop()
                }
            )
    }

    public openDepositIntoAccount() {
        this.dialogService.openDialog(DepositIntoAccountComponent)
    }

    public openSendMoney() {
        this.dialogService.closeAllDialogs()
        this.dialogService.openDialog(SendMoneyComponent)
    }

    public openTransactionHistory() {
        this.dialogService.openCustomDialog(TransactionHistoryComponent, {
            width: '95%',
            maxWidth: '700px',
            panelClass: 'dialog-transaction'
        })
    }

    public openContacts() {
        this.dialogService.openDialog(ContactsComponent)
    }

    public createBankAccount() {
        this.userAccountService.getUserAccount()
            .pipe(
                concatMap(res => {
                    const user = res['user']
                    this.userAccountInformations = user
                    return this.bankAccountService.create(user)
                }))
            .subscribe(
                res => {
                    this.bankAccountService.getSubject(this.userAccountInformations)
                    this.alertService.success('Parabens! Agora você tem uma PurpleConta.', false)
                    this.userHasBankAccount = true
                    this.loadingService.stop()
                },
                err => {
                    console.log(err)
                    this.loadingService.stop()
                    if(err.error) this.alertService.danger(err.error.message, false)
                    this.alertService.warning('Não foi possível criar sua PurpleConta :(. Tente novamente!', false)
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

    public async handleFile() {
        const file = (<HTMLInputElement>event.target).files[0]
        this.img = file

        const reader = new FileReader()
        
        reader.readAsDataURL(file)
        this.uploadProfileImage()
    }

    public uploadProfileImage() {
        this.userAccountService.getUserAccount()
            .pipe(
                concatMap(res => {
                    return this.userAccountService.addProfileImage(res['user'].cpf, this.img)
                }))
            .subscribe(
                res => {
                    this.loadingService.stop()
                    this.refreshUserAndBankAccount()
                    this.alertService.success('Imagem de perfil adicionada com sucesso!', false)
                },
                err => {
                    console.log(err)
                    this.loadingService.stop()
                    if(err.error) return this.alertService.danger(err.error.message, false)
                    this.alertService.warning('Algo está errado. Tente novamente.', false)
                })
    }

    public removeProfileImage() {
        this.userAccountService.getUserAccount()
            .pipe(
                concatMap(res => this.userAccountService.removeProfileImage(res['user'].cpf)))
            .subscribe(
                res => {
                    this.loadingService.stop()
                    this.refreshUserAndBankAccount()
                    this.alertService.success('Foto de perfil removida com sucesso!', false)
                },
                err => {
                    console.log(err)
                    this.loadingService.stop()
                    if(err.error) return this.alertService.danger(err.error.message, false)
                    this.alertService.warning('Algo deu errado! Tente novamente.', false)
                }
            )
    }
}