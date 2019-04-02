import { NgModule } from "@angular/core";
import { ContactsComponent } from './contacts.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs'
import { ReactiveFormsModule } from '@angular/forms';
import { OnMouserHoverModule } from '../shared/directives/on-mouse-hover/on-mouse-hover.module';
import { SearchContactComponent } from './search-contact/search-contact.component';
import { FilterByNicknamePipe } from './filter-by-nickname.pipe';

@NgModule({
    declarations: [ContactsComponent, SearchContactComponent, FilterByNicknamePipe],
    imports: [CommonModule, MatDialogModule, MatInputModule, MatIconModule, MatFormFieldModule, MatButtonModule, MatTabsModule, ReactiveFormsModule, OnMouserHoverModule],
    entryComponents: [ContactsComponent]
})
export class ContactsModule {}