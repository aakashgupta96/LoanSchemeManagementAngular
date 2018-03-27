import {Component, OnInit} from '@angular/core';
import {NotificationBuilder} from "../../misc/notification/notification.builder";
import {LoanAppNotificationType} from "../../models/loan-app-notification.model";
import {NotificationService} from "../../services/notificaton.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email: string;
  password: string;
  loggedIn: boolean;

  constructor(private notificationService: NotificationService, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.loginStatusStream.subscribe(loginStatus => {
      this.loggedIn = loginStatus;
    });
  }

  login() {
    this.userService.login(this.email, this.password).then(res => {
      let newNotification = new NotificationBuilder()
        .title('Logged In')
        .message('Welcome to Loan App!')
        .showClose(true)
        .timeout(5000)
        .type(LoanAppNotificationType.SUCCESS)
        .build();

      this.notificationService.showNotification(newNotification);
      this.email = null;
      this.password = null;
    });
  }

  //need to fix the logout method
  logout() {
    this.log();
    this.log();
  }

  log() {
    this.userService.logout().then(res => {
      let newNotification = new NotificationBuilder()
        .title('Logged Out')
        .message('You are successfully logged out!')
        .showClose(true)
        .timeout(5000)
        .type(LoanAppNotificationType.SUCCESS)
        .build();

      this.notificationService.showNotification(newNotification);
    });
  }
}
