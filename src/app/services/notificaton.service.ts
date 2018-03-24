import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {LoanAppNotification} from "../models/loan-app-notification.model";


@Injectable()
export class NotificationService {

  notificationSource: BehaviorSubject<LoanAppNotification> = new BehaviorSubject<LoanAppNotification>(null);


  private notification: LoanAppNotification;

  constructor() {
  }

  showNotification(notification: LoanAppNotification) {
    this.notificationSource.next(notification);
  }
}
