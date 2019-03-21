import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class TokenService {
    public getToken() {
        return localStorage.getItem('token')
    }

    public setToken(token: string) {
        localStorage.setItem('token', token)
    }

    public hasToken() {
        return !!this.getToken()
    }

    public removeToken() {
        localStorage.removeItem('token')
    }
}