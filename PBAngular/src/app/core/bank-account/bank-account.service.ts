import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserAccountModel } from '../user-account/user-account.model';
import { BankAccount } from './bank-account';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BankAccountService {
    private bankSubject = new Subject<any>()
    public bank$ = this.bankSubject.asObservable()

    constructor(private http: HttpClient) {}

    public create(userAccount: UserAccountModel) {
        return this.http.post(`${environment.apiBaseUrl}/createBankAccount`, userAccount)
    }

    public get(userAccount: UserAccountModel) {
        this.getSubject(userAccount)
        return this.http.get<BankAccount>(`${environment.apiBaseUrl}/bankAccount`, {
            headers: new HttpHeaders({'UserAccount': JSON.stringify(userAccount)})
        })
    }

    public getSubject(userAccount: UserAccountModel) {
        this.http.get<BankAccount>(`${environment.apiBaseUrl}/bankAccount`, {
            headers: new HttpHeaders({'UserAccount': JSON.stringify(userAccount)})
        }).subscribe(res => this.bankSubject.next(res['bank_account']))
    }
}