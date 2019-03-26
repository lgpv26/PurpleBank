import { NgModule } from "@angular/core";
import { InterfaceAccountComponent } from './interface-account.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [InterfaceAccountComponent],
    imports: [CommonModule, RouterModule, MatButtonModule, MatFormFieldModule]
})
export class InterfaceAccountModule {
    
}