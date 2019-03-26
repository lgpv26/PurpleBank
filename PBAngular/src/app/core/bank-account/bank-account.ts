export interface BankAccount {
    bank_code: number,
    agency: number,
    agency_digit: string,
    balance: number,
    account: number,
    account_digit: string,
    account_type: string,
    account_status: string,
    document_number: string,
    legal_name: string,
    creation_date: Date
}