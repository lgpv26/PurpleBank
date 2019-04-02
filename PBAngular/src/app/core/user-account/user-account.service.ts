import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UserAccountModel } from './user-account.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../auth/token/token.service';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ContactModel } from './contact.model';

@Injectable({providedIn: 'root'})
export class UserAccountService {

    public userAccountSubject = new BehaviorSubject<UserAccountModel>(null)
    public userAccount$ = this.userAccountSubject.asObservable()

    public contactSubject = new BehaviorSubject<ContactModel>(null)
    public contact$ = this.contactSubject.asObservable()

    constructor(private http: HttpClient, private authService: AuthService, private tokenService: TokenService) {}

    public register(userAccount: UserAccountModel) {
        return this.http.post<UserAccountModel>(`${environment.apiBaseUrl}/register`, userAccount)
    }

    public login(cpf: string, password: string) {
        return this.authService.authenticate(cpf, password)
    }

    public isLogged() {
        const userPayload = this.getPayload()
        if(userPayload) return userPayload['exp'] > Date.now() / 1000
        else return false
    }

    public getPayload() {
        if(this.tokenService.hasToken()) return JSON.parse(atob(this.tokenService.getToken().split('.')[1]))
        else return null
    }

    public getUserAccount() {
        return this.http.get<UserAccountModel>(`${environment.apiBaseUrl}/userAccount`)
            .pipe(tap(res => this.userAccountSubject.next(res['user'])))
    }

    // public getUserAccountSubject() {
    //     this.http.get(`${environment.apiBaseUrl}/userAccount`)
    //         .subscribe(res => {
    //             this.userAccountSubject.next(res['user'])
    //         })
    // }

    public logout() {
        this.tokenService.removeToken()
        this.userAccountSubject.next(null)
    }

    public addContact(userDocument: number, contact: ContactModel) {
        return this.http.post(`${environment.apiBaseUrl}/addContact`, {userDocument, contact})
    } 

    public getContacts(userDocument: number) {
        return this.http.get(`${environment.apiBaseUrl}/getContacts/${userDocument}`)
    }

    public removeContact(userDocument: number, contactId: string) {
        return this.http.delete(`${environment.apiBaseUrl}/removeContact/${userDocument}/${contactId}`)
    }

    public setContactToTransfer(contact: ContactModel) {
        this.contactSubject.next(contact)
    }

    public addProfileImage(document: string, img: File) {
        const formData = new FormData()
        formData.append('img', img)
        formData.append('document', document)

        return this.http.post(`${environment.apiBaseUrl}/addProfileImage`, formData)
    }

    public removeProfileImage(document: string) {
        return this.http.put(`${environment.apiBaseUrl}/removeProfileImage/${document}`, {})
    }
}