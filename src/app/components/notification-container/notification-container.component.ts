import {Component, Input, OnInit} from '@angular/core';
import {isNullOrUndefined} from "util";
import {LoanAppNotification} from "../../models/loan-app-notification.model";
import {NotificationService} from "../../services/notificaton.service";


@Component({
  selector: 'app-notification-container',
  templateUrl: './notification-container.component.html',
  styleUrls: ['./notification-container.component.scss']
})
export class NotificationContainerComponent implements OnInit {

  notifications: LoanAppNotification[];
  pendingNotifications: LoanAppNotification[];
  visibleNotificationsCount = 0;
  @Input() verticalPosition;
  @Input() horizontalPosition;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    if (isNullOrUndefined(this.pendingNotifications)) {
      this.pendingNotifications = [];
    }
    this.notifications = [];

    this.notificationService.notificationSource.subscribe(
      notification => {
        if (!isNullOrUndefined(notification)) {
          if (this.visibleNotificationsCount < 4) {
            this.visibleNotificationsCount += 1;
            this.notifications.push(notification);
          } else {
            this.pendingNotifications.push(notification);
          }
        }
      }
    )
  }

  showPendingNotification() {
    if (this.visibleNotificationsCount > 0) {
      this.visibleNotificationsCount -= 1;
    }
    if (this.pendingNotifications.length > 0) {
      if (this.visibleNotificationsCount < 4) {
        let pNotification = this.pendingNotifications.splice(0, 1)[0];
        this.notifications.push(pNotification);
        this.visibleNotificationsCount += 1;
      }
    }
  }
}
