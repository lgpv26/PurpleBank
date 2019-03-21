import { Component, OnInit } from "@angular/core";
import { UserAccountService } from '../core/user-account/user-account.service';
import { UserAccountModel } from '../core/user-account/user-account.model';

@Component({
    templateUrl: './interface-account.component.html',
    styleUrls: ['./interface-account.component.css']
})
export class InterfaceAccountComponent implements OnInit {

    public userAccountInformations: UserAccountModel
    
    constructor(private userAccountService: UserAccountService) {}

    ngOnInit() {
        this.userAccountService.getUserAccount()
            .subscribe((res) => {
                this.userAccountInformations = res['user']
            })
    }
}