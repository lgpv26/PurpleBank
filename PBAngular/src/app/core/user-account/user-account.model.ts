import { ContactModel } from './contact.model';

export interface UserAccountModel {
    fullName: string,
    email: string, 
    cpf: string,
    phone: string,
    password: string,
    terms: boolean,
    img: string,
    contacts?: [ContactModel] 
}