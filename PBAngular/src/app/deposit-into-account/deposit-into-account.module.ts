import { NgModule } from "@angular/core";
import { DepositIntoAccountComponent } from './deposit-into-account.component';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DepositIntoAccountComponent],
    imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    entryComponents: [DepositIntoAccountComponent]
})
export class DepositIntoAccountModule {}