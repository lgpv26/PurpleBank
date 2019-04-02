import { NgModule } from "@angular/core";
import { ImmediateClickDirective } from './immediate-click.directive';

@NgModule({
    declarations: [ImmediateClickDirective],
    exports: [ImmediateClickDirective]
})
export class ImmediateClickModule {}