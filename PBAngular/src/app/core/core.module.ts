import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RouterModule } from '@angular/router'

import { HeaderComponent } from './header/header.component';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TermsModule } from '../terms/terms.module';
import { RequestInterceptor } from './auth/request.interceptor';
import { AlertMessageModule } from '../shared/components/alert-message/alert-message.module';

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, HttpClientModule, RouterModule, AlertMessageModule, LoginModule, RegisterModule, TermsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    exports: [HeaderComponent],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}
    ]
})
export class CoreModule {}