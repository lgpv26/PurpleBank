import { Component, Output, EventEmitter, Input } from "@angular/core";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'pb-search-contact',
    templateUrl: './search-contact.component.html'
})
export class SearchContactComponent {
    @Output() public onTyping = new EventEmitter<string>()
    @Input() public value = ''

    public debounce = new Subject<string>()

    public refreshSearch(event: Event) {
        this.debounce.next((<HTMLInputElement>event.target).value)
        this.debounce
            .pipe(debounceTime(300))
            .subscribe(filter => this.onTyping.emit(filter))
    }
}