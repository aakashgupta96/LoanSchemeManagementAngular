import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {NotificationBuilder} from "../../misc/notification/notification.builder";
import {LoanAppNotificationType} from "../../models/loan-app-notification.model";
import {NotificationService} from "../../services/notificaton.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email: string;
  password: string;
  loggedIn: boolean;
  user: User;

  updateProfileDialogRef: MatDialogRef<any>;

  constructor(private notificationService: NotificationService, private userService: UserService,
              public dialog: MatDialog, public viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.userService.loginStatusStream.subscribe(loginStatus => {
      this.loggedIn = loginStatus;
      if (this.loggedIn) {
        this.user = this.userService.getUser();
      }
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

  openUpdateDialog() {
    let config = new MatDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.updateProfileDialogRef = this.dialog.open(UpdateProfileDialog, config);
    this.updateProfileDialogRef.componentInstance.user = this.user;
    this.updateProfileDialogRef.afterClosed().subscribe(user => {
      this.updateProfileDialogRef = null;
      console.log(user);
      this.user = user;
    });
  }

  updateUserDetails() {

  }

  openCompanyDialog() {

  }

  openDoubtDialog() {
    let config = new MatDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.updateProfileDialogRef = this.dialog.open(AskDoubtDialog, config);
    this.updateProfileDialogRef.componentInstance.user = this.user;
    this.updateProfileDialogRef.afterClosed().subscribe(user => {
      this.updateProfileDialogRef = null;
      console.log(user);
      this.user = user;
    });
  }
}


@Component({
  selector: 'update-profile-dialog',
  templateUrl: './update-profile-dialog.component.html',
  styleUrls: ['./update-profile-dialog.component.css']
})
export class UpdateProfileDialog {

  name: string;
  image: string;
  address: string;
  phone: string;

  constructor(public dialogRef: MatDialogRef<any>, public viewContainerRef: ViewContainerRef,
              private notificationService: NotificationService, private userService: UserService) {
  }

  handleInputChange(e) {
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    let pattern = /image-*/;
    let reader = new FileReader();
    if (file.type && !file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.image = reader.result;
  }

  updateProfile() {
    this.userService.updateProfile(this.name, this.phone, this.address, this.image).then(res => {
      let newNotification = new NotificationBuilder()
        .title('Success')
        .message('Profile Successfully Updated!')
        .showClose(true)
        .timeout(5000)
        .type(LoanAppNotificationType.SUCCESS)
        .build();

      this.notificationService.showNotification(newNotification);
      let config = new MatDialogConfig();
      config.viewContainerRef = this.viewContainerRef;
      this.dialogRef.close(res.user);
    })
  }
}

@Component({
  selector: 'ask-doubt-dialog',
  templateUrl: './ask-doubt-dialog.component.html',
  styleUrls: ['./ask-doubt-dialog.component.css']
})
export class AskDoubtDialog {

  name: string;
  image: string;
  address: string;
  phone: string;

  constructor(public dialogRef: MatDialogRef<any>, public viewContainerRef: ViewContainerRef,
              private notificationService: NotificationService, private userService: UserService) {
  }

}
