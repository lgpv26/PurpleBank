import { Component, Output, EventEmitter, Input, ViewChild } from "@angular/core";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

@Component({
    selector: 'pb-search-transactions',
    templateUrl: './search-transactions.component.html'
})
export class SearchTransactionsComponent {

    @Output() public onTyping = new EventEmitter<string>()
    @Input() public value = ''

    @ViewChild('group') public buttonToggle: MatButtonToggleGroup

    private description: string = ''
    private type: string = ''

    public debounce = new Subject<string>()

    public refreshSearch(event: any) {
        if((<HTMLInputElement>event.target)) this.description = (<HTMLInputElement>event.target).value
        else this.description = ''

        this.type = this.buttonToggle.value

        this.debounce.next(this.type + this.description)
        this.debounce
            .pipe(debounceTime(300))
            .subscribe(filter => this.onTyping.emit(filter))
    }

}