import { NgModule } from "@angular/core";
import { InterfaceAccountComponent } from './interface-account.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [InterfaceAccountComponent],
    imports: [CommonModule, RouterModule]
})
export class InterfaceAccountModule {
    
}