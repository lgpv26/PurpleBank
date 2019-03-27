import { NgModule } from "@angular/core";
import { InterfaceAccountComponent } from './interface-account.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [InterfaceAccountComponent],
    imports: [CommonModule, RouterModule, MatButtonModule, MatFormFieldModule, MatIconModule]
})
export class InterfaceAccountModule {
    
}