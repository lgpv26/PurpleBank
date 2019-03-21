import { Component } from "@angular/core";
import { DialogLoginToRegisterService } from '../core/header/dialog-login-to-register.service';
import { RegisterComponent } from '../core/register/register.component';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    constructor(private dialogService: DialogLoginToRegisterService) {}

    public openRegister() {
        this.dialogService.openDialog(RegisterComponent)
    }
}