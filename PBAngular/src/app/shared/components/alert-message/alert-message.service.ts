import { Injectable } from "@angular/core";
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { AlertType, AlertMessageTypeModel } from './alert-type';

@Injectable({providedIn: 'root'})
export class AlertMessageService {

    private alertMessageSubject: Subject<any> = new Subject<any>()
    private keepMessageAfterRouteChange: boolean

    constructor(private router: Router) {
        this.router.events
            .subscribe(observer => {
                if(observer instanceof NavigationStart) {
                    if(this.keepMessageAfterRouteChange) this.keepMessageAfterRouteChange = false
                    else this.clear()
                }
        })
    }

    public getAlert() {
        return this.alertMessageSubject.asObservable()
    }

    public clear() {
        this.alertMessageSubject.next(null)
    }

    private alert(alertType: AlertType, message: string, keepMessageAfterRouteChange: boolean) {
        this.keepMessageAfterRouteChange = keepMessageAfterRouteChange
        this.alertMessageSubject.next(new AlertMessageTypeModel(alertType, message))
    }

    public success(message: string, keepMessageAfterRouteChange: boolean) {
        this.alert(AlertType.SUCCESS, message, keepMessageAfterRouteChange)
    }

    public danger(message: string, keepMessageAfterRouteChange: boolean) {
        this.alert(AlertType.DANGER, message, keepMessageAfterRouteChange)
    }

    public warning(message: string, keepMessageAfterRouteChange: boolean) {
        this.alert(AlertType.WARNING, message, keepMessageAfterRouteChange)
    }

    public info(message: string, keepMessageAfterRouteChange: boolean) {
        this.alert(AlertType.INFO, message, keepMessageAfterRouteChange)
    }

}