import { NgModule } from "@angular/core";
import { OnMouserHoverDirective } from './on-mouse-hover.directive';

@NgModule({
    declarations: [OnMouserHoverDirective],
    exports: [OnMouserHoverDirective]
})
export class OnMouserHoverModule {}