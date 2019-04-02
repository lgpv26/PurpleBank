import { Component, OnInit, OnDestroy } from "@angular/core";
import { DialogLoginToRegisterService } from '../header/dialog-login-to-register.service';
import { RegisterComponent } from '../register/register.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cpfValidator } from 'src/app/shared/validators/cpf-validator/cpf.validator';
import { UserAccountService } from '../user-account/user-account.service';
import { TokenService } from '../auth/token/token.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertMessageService } from 'src/app/shared/components/alert-message/alert-message.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy{

    public form: FormGroup

    constructor(
        private dialogService: DialogLoginToRegisterService,
        private formBuilder: FormBuilder,
        private userAccountService: UserAccountService,
        private tokenService: TokenService,
        private router: Router,
        private alertMessageService: AlertMessageService,
        private loadingService: LoadingService) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            cpf: ['', [
                Validators.required,
                cpfValidator
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(6)
            ]]
        })
    }

    ngOnDestroy() {}

    public openRegister() {
        this.dialogService.openDialog(RegisterComponent)
    }

    public login(formGroup: FormGroup) {
        this.userAccountService.login(formGroup.value['cpf'], formGroup.value['password'])
            .subscribe(
                res => {
                    this.tokenService.setToken(res['token'])
                    this.dialogService.closeAllDialogs()
                    //this.userAccountService.getUserAccountSubject()
                    this.router.navigate(['/user-account'])
                },
                (err: HttpErrorResponse) => {
                    this.loadingService.stop()
                    console.log(err)
                    if(err.error['message']) {
                        this.alertMessageService.danger(err.error['message'], false)
                        return
                    }
                    this.alertMessageService.warning('Algo deu errado :(. Tente novamente!', false)
                })
    }

    public justNumbers(fieldName: string) {
        let replaceField = this.form.get(fieldName).value
        this.form.get(fieldName).setValue(replaceField.replace(/\D/g, ''))
    }
}