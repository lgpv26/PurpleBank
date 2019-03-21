import { Component, OnInit } from "@angular/core";
import { DialogLoginToRegisterService } from './dialog-login-to-register.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { UserAccountService } from '../user-account/user-account.service';
import { Router } from '@angular/router';

@Component({
    selector: 'pb-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    public userAccount$ = this.userAccountService.userAccount$

    constructor(
        private dialogService: DialogLoginToRegisterService,
        private userAccountService: UserAccountService,
        private router: Router) {
    }

    ngOnInit() {
        this.userAccountService.getUserAccountSubject()
    }

    public openLoginDialog() {
        this.dialogService.openDialog(LoginComponent)
    }

    public openRegisterDialog() {
        this.dialogService.openDialog(RegisterComponent)
    }

    public logout() {
        this.userAccountService.logout()
        this.router.navigate([''])
    }

}