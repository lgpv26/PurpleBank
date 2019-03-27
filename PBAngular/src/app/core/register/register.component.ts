import { Component, OnInit, OnDestroy } from "@angular/core";
import { DialogLoginToRegisterService } from '../header/dialog-login-to-register.service';
import { LoginComponent } from '../login/login.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { confirmPasswordValidator } from './confirm-password.validator';
import { MyErrorStateMatcher } from '../errors/my-error-state-matcher';
import { TermsComponent } from 'src/app/terms/terms.component';
import { cpfValidator } from 'src/app/shared/validators/cpf-validator/cpf.validator';
import { phoneValidator } from 'src/app/shared/validators/phone-number/phone.validator';
import { UserAccountModel } from '../user-account/user-account.model';
import { UserAccountService } from '../user-account/user-account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertMessageService } from 'src/app/shared/components/alert-message/alert-message.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy{
    
    public form: FormGroup
    public matcher = new MyErrorStateMatcher()

    constructor(
        private dialogService: DialogLoginToRegisterService,
        private formBuilder: FormBuilder,
        private userAccountService: UserAccountService,
        private alertMessageService: AlertMessageService,
        private loadingService: LoadingService) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            fullName: ['', [
                Validators.required,
                Validators.minLength(3)
            ]],
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            cpf: ['', [
                Validators.required,
                Validators.pattern(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/),
                cpfValidator
            ]],
            phone: ['', [
                Validators.required,
                phoneValidator
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(6)
            ]],
            confirmPassword: ['', [
                Validators.required,
                Validators.minLength(6),
            ]],
            terms: [false, [
                Validators.required,
                Validators.pattern('true')
            ]]
        }, {
            validators: [confirmPasswordValidator]
        })
    }

    ngOnDestroy() {}

    public openLogin() {
        this.dialogService.openDialog(LoginComponent)
    }

    public openTerms() {
        this.dialogService.openCustomDialog(TermsComponent, {
            width: '75%',
            maxWidth: '500px'
        }).afterClosed()
            .subscribe(result => {
                this.form.get('terms').setValue(result)
            })
    }

    public register(formGroup: FormGroup) {
        let userAccount: UserAccountModel = {
            fullName: formGroup.value['fullName'],
            email: formGroup.value['email'],
            cpf: formGroup.value['cpf'],
            phone: formGroup.value['phone'],
            password: formGroup.value['password'],
            terms: formGroup.value['terms'],
            img: ''
        }

        this.userAccountService.register(userAccount)
            .subscribe(
                res => {
                    this.dialogService.closeAllDialogs()
                    this.openLogin()
                    this.alertMessageService.success('Conta criado com sucesso! Acesse-a.', false)
                },
                (err: HttpErrorResponse) => {
                    this.loadingService.stop()
                    console.log(err)
                    if(err.error) {
                        this.alertMessageService.danger(err.error, true)
                        return 
                    }
                    this.alertMessageService.warning('Alguma coisa está errada :(. Tente novamente!', true)
                })
    }

    public justNumbers(fieldName: string) {
        let replaceField = this.form.get(fieldName).value
        this.form.get(fieldName).setValue(replaceField.replace(/\D/g, ''))
    }
}