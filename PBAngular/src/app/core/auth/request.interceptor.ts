import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { TokenService } from './token/token.service';
import { tap } from 'rxjs/operators'
import { Router } from '@angular/router';
import { DialogLoginToRegisterService } from '../header/dialog-login-to-register.service';
import { LoginComponent } from '../login/login.component';
import { UserAccountService } from '../user-account/user-account.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService,
        private router: Router,
        private dialogService: DialogLoginToRegisterService,
        private userService: UserAccountService) {}

    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        //if(req.headers.get('noAuth')) return next.handle(req.clone())
        if(!this.tokenService.hasToken()) {
            this.router.navigate(['/'])
            this.userService.logout()
            return next.handle(req.clone())
        }
        else {
            return next.handle(req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.tokenService.getToken())
            })).pipe(tap(
                (event) => {},
                (err: HttpErrorResponse) => {
                    if(err.error.auth === false) {
                        this.router.navigate(['/'])
                        this.dialogService.closeAllDialogs()
                        this.dialogService.openDialog(LoginComponent)
                    }
                } 
            ))
        }
    }
}