import { NgModule } from '@angular/core'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { LoadingComponent } from './loading.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './loading.interceptor';

@NgModule({
    declarations: [LoadingComponent],
    imports: [CommonModule, MatProgressSpinnerModule],
    exports: [LoadingComponent],
    providers: [{
        provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }]
})
export class LoadingModule {}