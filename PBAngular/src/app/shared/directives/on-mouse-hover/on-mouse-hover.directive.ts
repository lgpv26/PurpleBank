import { Directive, Input, Renderer2, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[onMouseHover]'
})
export class OnMouserHoverDirective {

    @Input() public opacity = '.8'
    
    constructor(private renderer: Renderer2, private el: ElementRef) {}

    @HostListener('mouseover')
    public darkOn() {
        this.renderer.setStyle(this.el.nativeElement, 'opacity', this.opacity)
    }

    @HostListener('mouseleave') 
    public darkOff() {
        this.renderer.setStyle(this.el.nativeElement, 'opacity', '1')
    }
}