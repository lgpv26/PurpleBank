import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAccountService } from '../core/user-account/user-account.service';
import { concatMap } from 'rxjs/operators';
import { ContactModel } from '../core/user-account/contact.model';
import { UserAccountModel } from '../core/user-account/user-account.model';
import { LoadingService } from '../shared/components/loading/loading.service';
import { AlertMessageService } from '../shared/components/alert-message/alert-message.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { DialogLoginToRegisterService } from '../core/header/dialog-login-to-register.service';
import { SendMoneyComponent } from '../send-money/send-money.component';

@AutoUnsubscribe()
@Component({
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {

    public formContacts: FormGroup

    public contacts: ContactModel[] = []
    public user: UserAccountModel

    public filter: string = ''

    constructor(private formBuilder: FormBuilder,
        private userService: UserAccountService,
        private loadingService: LoadingService,
        private alertService: AlertMessageService,
        private dialogService: DialogLoginToRegisterService) {}

    ngOnInit() {
        this.formContacts = this.formBuilder.group({
            nickname: ['', [
                Validators.required
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

        this.refreshContacts()
    }

    ngOnDestroy() {}

    public toTransfer(contact: ContactModel) {
        this.dialogService.closeAllDialogs()
        this.dialogService.openDialog(SendMoneyComponent)
        this.userService.setContactToTransfer(contact)
    }

    public addContact() {
        const contact: ContactModel = {
            nickname: this.formContacts.get('nickname').value,
            agency: this.formContacts.get('agency').value,
            account: this.formContacts.get('account').value,
            account_digit: this.formContacts.get('account_digit').value
        }

        this.userService.getUserAccount()
            .pipe(
                concatMap(res => {
                    this.user = res['user']
                    return this.userService.addContact(parseInt(this.user.cpf), contact)
                }))
            .subscribe(
                res => {
                    this.contacts = res['contacts']
                    this.refreshContacts()
                    this.alertService.success('Contato adicionado com sucesso!', false)
                },
                err => {
                    console.log(err)
                    this.loadingService.stop()
                    if(err.error) return this.alertService.danger(err.error.message, false)
                    this.alertService.warning('Algo deu errado. Tente novamente.', false)
                })
    }

    public removeContact(contactId: string) {
        this.userService.getUserAccount()
            .pipe(
                concatMap(res => {
                    this.user = res['user']
                    return this.userService.removeContact(parseInt(this.user.cpf), contactId)
                }))
            .subscribe(
                res => {
                    this.contacts = res['user'].contacts
                    this.alertService.success('Contato removido com sucesso!', false)
                    this.loadingService.stop()
                },
                err => {
                    console.log(err)
                    this.loadingService.stop()
                    if(err.error) return this.alertService.danger(err.error.message, false)
                    this.alertService.warning('Algo deu errado. Tente novamente.', false)
                })
    }

    public refreshContacts() {
        this.userService.getUserAccount()
            .pipe(
                concatMap(res => {
                    this.user = res['user']
                    return this.userService.getContacts(parseInt(this.user.cpf))
                }))
            .subscribe(
                res => {
                    this.contacts = res['contacts']
                    this.filter = ''
                },
                err => {
                    console.log(err)
                    this.loadingService.stop()
                    if(err.error) return this.alertService.danger(err.error.message, false)
                    this.alertService.warning('Algo deu errado. Tente novamente.', false)
                })
    }
}