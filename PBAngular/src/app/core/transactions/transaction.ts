import { BankAccount } from '../bank-account/bank-account';

export interface Transaction {
    status: string,
    amount: number,
    creation_date: Date,
    description: string,
    sender: BankAccount
    receiver: BankAccount
}