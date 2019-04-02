import { NgModule } from "@angular/core";
import { TransactionHistoryComponent } from './transaction-history.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchTransactionsComponent } from './search-transactions/search-transactions.component';
import { FilterByDescriptionPipe } from './filter-by-description.pipe';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
    declarations: [TransactionHistoryComponent, SearchTransactionsComponent, FilterByDescriptionPipe],
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonToggleModule],
    entryComponents: [TransactionHistoryComponent]
})
export class TransactionHistoryModule {}