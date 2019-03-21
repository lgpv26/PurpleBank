import { NgModule } from "@angular/core";
import { RegisterComponent } from './register.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AlertMessageModule } from 'src/app/shared/components/alert-message/alert-message.module';

@NgModule({
    declarations: [RegisterComponent],
    imports: [CommonModule, ReactiveFormsModule, AlertMessageModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule],
    entryComponents: [RegisterComponent]
})
export class RegisterModule {}