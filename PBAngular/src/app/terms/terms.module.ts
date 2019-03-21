import { NgModule } from "@angular/core";
import { TermsComponent } from './terms.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [TermsComponent],
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    entryComponents: [TermsComponent]
})
export class TermsModule {}