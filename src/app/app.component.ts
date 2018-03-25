import {Component, OnInit} from '@angular/core';
import {NotificationBuilder} from "./misc/notification/notification.builder";
import {LoanAppNotificationType} from "./models/loan-app-notification.model";
import {NotificationService} from "./services/notificaton.service";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  email: string;
  password: string;
  loggedIn: boolean;

  constructor(private notificationService: NotificationService, private userService: UserService) {
  }

  ngOnInit() {
    let newNotification = new NotificationBuilder()
      .title('Test')
      .message('Some test')
      .showClose(true)
      .timeout(5000)
      .type(LoanAppNotificationType.SUCCESS)
      .build();

    this.notificationService.showNotification(newNotification)
    this.userService.loginStatusStream.subscribe(loginStatus => {
      this.loggedIn = loginStatus;
    });
  }

  login() {
    this.userService.login(this.email, this.password);
  }

  logout() {
    this.userService.logout();
  }

}
