import { NgModule } from "@angular/core";
import { AlertMessageComponent } from './alert-message.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [AlertMessageComponent],
    imports: [CommonModule],
    exports: [AlertMessageComponent]
})
export class AlertMessageModule {}