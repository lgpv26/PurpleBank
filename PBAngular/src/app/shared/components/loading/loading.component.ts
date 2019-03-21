import { Component, OnInit } from '@angular/core'
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'pb-loading',
    templateUrl: './loading.component.html',
    styles: [`
        
        .pb-bg-loading {
            background: black; 
            width: 100%; 
            height: 100%; 
            position: fixed; 
            z-index: 9999; 
            opacity: .6;
        }

        .stopped {
            display: none;
        }
    
    `]
})
export class LoadingComponent implements OnInit{
    public isLoading$: Observable<string>

    constructor(private loadingService: LoadingService) {}

    ngOnInit() {
        this.isLoading$ = this.loadingService.getLoadingState()
            .pipe(map(state => state.valueOf()))
    }
}