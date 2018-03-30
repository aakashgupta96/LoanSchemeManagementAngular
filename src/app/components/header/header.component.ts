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
  log:boolean;

  constructor(private notificationService: NotificationService, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.loginStatusStream.subscribe(loginStatus => {
      this.loggedIn = loginStatus;
    });
  }

  login() {
    if (this.email && this.isEmailValid(this.email) && this.password && this.password.length > 0) {
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
    } else if (!this.email || !this.isEmailValid(this.email)) {
      let newNotification = new NotificationBuilder()
        .title('Invalid Email')
        .message('Please enter a valid email!')
        .showClose(true)
        .timeout(5000)
        .type(LoanAppNotificationType.ERROR)
        .build();

      this.notificationService.showNotification(newNotification);
    } else if (!this.password || this.password.length == 0) {
      let newNotification = new NotificationBuilder()
        .title('Invalid Password')
        .message('Please enter a valid password!')
        .showClose(true)
        .timeout(5000)
        .type(LoanAppNotificationType.ERROR)
        .build();

      this.notificationService.showNotification(newNotification);
    }
  }

  logout() {
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

  isEmailValid(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
