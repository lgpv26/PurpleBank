import { NgModule } from "@angular/core";
import { TransactionHistoryComponent } from './transaction-history.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [TransactionHistoryComponent],
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
    entryComponents: [TransactionHistoryComponent]
})
export class TransactionHistoryModule {}