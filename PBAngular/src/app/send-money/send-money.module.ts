import { NgModule } from "@angular/core";
import { SendMoneyComponent } from './send-money.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmTransferComponent } from './confirm-transfer/confirm-transfer.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@NgModule({
    declarations: [SendMoneyComponent, ConfirmTransferComponent],
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatStepperModule, MatIconModule],
    entryComponents: [SendMoneyComponent, ConfirmTransferComponent],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false }
        }
    ]
})
export class SendMoneyModule {} 