import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isNullOrUndefined} from "util";
import {LoanAppNotification, LoanAppNotificationType} from "../../../models/loan-app-notification.model";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() notification: LoanAppNotification;
  display = true;
  notificationTypes = LoanAppNotificationType;
  @Output() notificationExpired = new EventEmitter;

  constructor() {
  }

  ngOnInit() {
    this.removeAfterInterval();
  }

  removeAfterInterval() {
    if (!isNullOrUndefined(this.notification.timeout)) {
      setTimeout(() => {
        if (this.display) {
          this.notificationExpired.emit();
        }
        this.display = false;
      }, this.notification.timeout);
    }
  }

  close() {
    this.display = false;
    this.notificationExpired.emit();
  }
}
