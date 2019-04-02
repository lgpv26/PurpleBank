import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BankAccount } from '../bank-account/bank-account';
import { Transaction } from './transaction';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TransactionService {
    constructor(private http: HttpClient) {}

    public deposit(bankAccount: BankAccount, transaction: Transaction) {
        return this.http.post(`${environment.apiBaseUrl}/deposit`, {bankAccount, transaction})
    }

    public transfer(transaction: Transaction) {
        return this.http.post(`${environment.apiBaseUrl}/transfer`, {transaction})
    }

    public getHistory(document: number, agency: number, account: number, accountDigit: number, limit = 10) {
        return this.http.get(`${environment.apiBaseUrl}/transactionsHistory/${limit}/${document}/${agency}/${account}/${accountDigit}`)
    }
}