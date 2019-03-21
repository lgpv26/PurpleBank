import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}

    public authenticate(cpf: string, password: string) {
        return this.http.post(`${environment.apiBaseUrl}/auth`, { cpf, password })
    }
}