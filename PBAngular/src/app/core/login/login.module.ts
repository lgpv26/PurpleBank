import { NgModule } from "@angular/core";
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AlertMessageModule } from 'src/app/shared/components/alert-message/alert-message.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [CommonModule, RouterModule, AlertMessageModule, HttpClientModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    entryComponents: [LoginComponent]
})
export class LoginModule {}