import { Component, OnInit } from "@angular/core";
import { UserAccountService } from '../core/user-account/user-account.service';
import { UserAccountModel } from '../core/user-account/user-account.model';
import { DialogLoginToRegisterService } from '../core/header/dialog-login-to-register.service';
import { DepositIntoAccountComponent } from '../deposit-into-account/deposit-into-account.component';

@Component({
    templateUrl: './interface-account.component.html',
    styleUrls: ['./interface-account.component.css']
})
export class InterfaceAccountComponent implements OnInit {

    public userAccountInformations: UserAccountModel
    
    constructor(private userAccountService: UserAccountService, private dialogService: DialogLoginToRegisterService) {}

    ngOnInit() {
        this.userAccountService.getUserAccount()
            .subscribe((res) => {
                this.userAccountInformations = res['user']
            })
    }

    public openDepositIntoAccount() {
        this.dialogService.openDialog(DepositIntoAccountComponent)
    }
}