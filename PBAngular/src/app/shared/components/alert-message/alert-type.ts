export class AlertMessageTypeModel {
    constructor(public readonly alertType: AlertType, public readonly _message: string) {}
}

export enum AlertType {
    SUCCESS,
    DANGER,
    WARNING,
    INFO
}