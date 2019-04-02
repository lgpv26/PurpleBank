import { Component, Input } from "@angular/core";
import { AlertMessageService } from './alert-message.service';
import { AlertMessageTypeModel, AlertType } from './alert-type';
import { timeout } from 'rxjs/operators';

@Component({
    selector: 'pb-alert-message',
    templateUrl: './alert-message.component.html'
})
export class AlertMessageComponent {

    @Input() public timeout: number = 5000
    public alerts: AlertMessageTypeModel[] = []

    constructor(private alertMessageService: AlertMessageService) {
        this.alertMessageService.getAlert()
            .subscribe(
                alert => {
                    if(!alert) {
                        this.alerts = []
                        return
                    }

                    if(this.alerts.length >= 1) this.alerts.shift()
                    else this.alerts.push(alert)

                    setTimeout(() => this.removeAlert(alert), this.timeout)
                }
            )
    }

    public getAlertClass(alert: AlertMessageTypeModel) {
        if(!alert) return ''

        switch(alert.alertType) {
            case AlertType.SUCCESS: return 'alert-success'
            case AlertType.DANGER: return 'alert-danger'
            case AlertType.WARNING: return 'alert-warning'
            case AlertType.INFO: return 'alert-info'
        }
    }

    public removeAlert(alertToRemove: AlertMessageTypeModel) {
        this.alerts = this.alerts.filter((alert) => alert != alertToRemove)
    }

}
