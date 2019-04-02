import { Pipe, PipeTransform } from "@angular/core";
import { ContactModel } from '../core/user-account/contact.model';

@Pipe({
    name: 'filterByNickname'
})
export class FilterByNicknamePipe implements PipeTransform {
    transform(contacts: ContactModel[], nicknameQuery: string) {
        nicknameQuery = nicknameQuery.trim().toLowerCase()

        if(nicknameQuery) return contacts.filter(
            (contact: ContactModel) => contact.nickname.toLowerCase().includes(nicknameQuery))
        else return contacts
    }
}