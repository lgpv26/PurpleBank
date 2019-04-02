import { Pipe, PipeTransform } from "@angular/core";
import { Transaction } from '../core/transactions/transaction';

@Pipe({
    name: 'filterByDescription'
})
export class FilterByDescriptionPipe implements PipeTransform {
    transform(transactions: Transaction[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery.trim().toLocaleLowerCase()

        if(descriptionQuery) return transactions.filter((transaction) => transaction.description.toLocaleLowerCase().includes(descriptionQuery))
        else return transactions
    }

}