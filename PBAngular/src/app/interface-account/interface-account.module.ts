import { NgModule } from "@angular/core";
import { InterfaceAccountComponent } from './interface-account.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ImmediateClickModule } from '../shared/directives/immediate-click/immediate-click.module';

@NgModule({
    declarations: [InterfaceAccountComponent],
    imports: [CommonModule, RouterModule, MatButtonModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, ImmediateClickModule]
})
export class InterfaceAccountModule {
    
}