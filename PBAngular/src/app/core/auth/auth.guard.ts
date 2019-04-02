import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { UserAccountService } from '../user-account/user-account.service';
import { TokenService } from './token/token.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private userAccountService: UserAccountService, private tokenService: TokenService, private router: Router) {}

    canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        if(this.userAccountService.isLogged()) return true
        else {
            this.tokenService.removeToken()
            this.router.navigate([''])
            return false
        }
    }
}