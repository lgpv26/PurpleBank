import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UserAccountModel } from './user-account.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../auth/token/token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserAccountService {

    private userAccountSubject: BehaviorSubject<UserAccountModel> = new BehaviorSubject<UserAccountModel>(null)
    public userAccount$ = this.userAccountSubject.asObservable()

    constructor(private http: HttpClient, private authService: AuthService, private tokenService: TokenService) {}

    public register(userAccount: UserAccountModel) {
        return this.http.post<UserAccountModel>(`${environment.apiBaseUrl}/register`, userAccount)
    }

    public login(cpf: string, password: string) {
        return this.authService.authenticate(cpf, password)
    }

    public isLogged() {
        const userPayload = this.getPayload()
        if(userPayload) return userPayload['exp'] > Date.now() / 1000
        else return false
    }

    public getPayload() {
        if(this.tokenService.hasToken()) return JSON.parse(atob(this.tokenService.getToken().split('.')[1]))
        else return null
    }

    public getUserAccount() {
        return this.http.get<UserAccountModel>(`${environment.apiBaseUrl}/userAccount`)
    }

    public getUserAccountSubject() {
        this.http.get(`${environment.apiBaseUrl}/userAccount`)
            .subscribe(res => {
                this.userAccountSubject.next(res['user'])
            })
    }

    public logout() {
        this.tokenService.removeToken()
        this.userAccountSubject.next(null)
    }

}