import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

@Injectable({providedIn: 'root'})
export class DialogLoginToRegisterService {

    constructor(private dialogBox: MatDialog) {}

    public openDialog(component) {
        return this.dialogBox.open(component, {
            width: '75%',
            maxWidth: '700px'
        })
    }

    public openCustomDialog(component, object: MatDialogConfig<any>) {
        return this.dialogBox.open(component, object)
    }

    public closeAllDialogs() {
        this.dialogBox.closeAll()
    }

}