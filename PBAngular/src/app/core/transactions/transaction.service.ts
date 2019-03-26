import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserAccountModel } from '../user-account/user-account.model';
import { BankAccount } from '../bank-account/bank-account';
import { Transaction } from './transaction';

@Injectable({providedIn: 'root'})
export class TransactionService {
    constructor(private http: HttpClient) {}

    public deposit(userAccount: UserAccountModel, bankAccount: BankAccount, transaction: Transaction) {
        return this.http.post(`${environment.apiBaseUrl}/deposit`, {userAccount, bankAccount, transaction})
    }
}