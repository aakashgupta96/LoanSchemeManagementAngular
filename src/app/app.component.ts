import {Component, OnInit} from '@angular/core';
import {NotificationBuilder} from "./misc/notification/notification.builder";
import {LoanAppNotificationType} from "./models/loan-app-notification.model";
import {NotificationService} from "./services/notificaton.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    console.log("start")
    let newNotification = new NotificationBuilder()
      .title('Test')
      .message('Some test')
      .showClose(true)
      .timeout(50000)
      .type(LoanAppNotificationType.SUCCESS)
      .build();

    this.notificationService.showNotification(newNotification);
  }
}
