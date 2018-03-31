import {Component, HostListener, Inject, OnInit, ViewContainerRef} from '@angular/core';
import {NotificationBuilder} from '../../misc/notification/notification.builder';
import {LoanAppNotificationType} from '../../models/loan-app-notification.model';
import {NotificationService} from '../../services/notificaton.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {DOCUMENT} from '@angular/common';
import {isNullOrUndefined} from 'util';

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

  showing = true;

  constructor(private notificationService: NotificationService, private userService: UserService,
              public dialog: MatDialog, public viewContainerRef: ViewContainerRef, @Inject(DOCUMENT) private document: Document) {
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
        const newNotification = new NotificationBuilder()
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
      const newNotification = new NotificationBuilder()
        .title('Invalid Email')
        .message('Please enter a valid email!')
        .showClose(true)
        .timeout(5000)
        .type(LoanAppNotificationType.ERROR)
        .build();

      this.notificationService.showNotification(newNotification);
    } else if (!this.password || this.password.length == 0) {
      const newNotification = new NotificationBuilder()
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
      const newNotification = new NotificationBuilder()
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
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  openUpdateDialog() {
    const config = new MatDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.updateProfileDialogRef = this.dialog.open(UpdateProfileDialog, config);
    this.updateProfileDialogRef.componentInstance.user = this.user;
    this.updateProfileDialogRef.afterClosed().subscribe(user => {
      this.updateProfileDialogRef = null;
      if (user) {
        this.user = user;
      }
    });
  }

  openCompanyDialog() {
    const config = new MatDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.updateProfileDialogRef = this.dialog.open(AddCompanyDialog, config);
    this.updateProfileDialogRef.componentInstance.user = this.user;
    this.updateProfileDialogRef.afterClosed().subscribe(result => {
      this.updateProfileDialogRef = null;
      if (result) {
        this.user.company_added = true;
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    this.showing = offset < 50;
  }

  openDoubtDialog() {
    const config = new MatDialogConfig();
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
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (file.type && !file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.image = reader.result;
  }

  updateProfile() {
    if (this.phone && this.phone.length < 10) {
      const newNotification = new NotificationBuilder()
        .title('Phone Number not valid')
        .message('Please enter a correct number!')
        .showClose(true)
        .timeout(5000)
        .type(LoanAppNotificationType.ALERT)
        .build();

      this.notificationService.showNotification(newNotification);
      return;
    }
    this.userService.updateProfile(this.name, this.phone, this.address, this.image).then(res => {
      const newNotification = new NotificationBuilder()
        .title('Success')
        .message('Profile Successfully Updated!')
        .showClose(true)
        .timeout(5000)
        .type(LoanAppNotificationType.SUCCESS)
        .build();

      this.notificationService.showNotification(newNotification);
      const config = new MatDialogConfig();
      config.viewContainerRef = this.viewContainerRef;
      this.dialogRef.close(res.user);
    });
  }
}

@Component({
  selector: 'ask-doubt-dialog',
  templateUrl: './ask-doubt-dialog.component.html',
  styleUrls: ['./ask-doubt-dialog.component.css']
})
export class AskDoubtDialog {

  description: string;


  constructor(public dialogRef: MatDialogRef<any>, public viewContainerRef: ViewContainerRef,
              private notificationService: NotificationService, private userService: UserService) {
  }

  postDoubt() {
    this.userService.ask_query(this.description).then(res => {
      const newNotification = new NotificationBuilder()
        .title('Success')
        .message('Doubt Successfully Posted!')
        .showClose(true)
        .timeout(5000)
        .type(LoanAppNotificationType.SUCCESS)
        .build();

      this.notificationService.showNotification(newNotification);
      const config = new MatDialogConfig();
      config.viewContainerRef = this.viewContainerRef;
      this.dialogRef.close(true);
    });
  }
}

@Component({
  selector: 'add-company-dialog',
  templateUrl: './add-company-dialog.component.html',
  styleUrls: ['./add-company-dialog.component.css']
})
export class AddCompanyDialog {

  name: string;
  description: string;
  incorporation_date: string;
  incorporation_number: string;
  location: string;
  phone: string;
  type: number;
  team_strength: string;
  growth_rate: string;
  pan: string;
  website: string;
  net_worth: string;
  image: string;
  profits: string;

  count = 1;
  count_arr: number[] = [1, 2, 3, 4];

  constructor(public dialogRef: MatDialogRef<any>, public viewContainerRef: ViewContainerRef,
              private notificationService: NotificationService, private userService: UserService) {
  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (file.type && !file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.image = reader.result;
  }

  checkDisabled(): boolean {
    switch (this.count) {
      case 1:
        return !(this.name && this.description);
      case 2:
        return !(this.phone && this.location && this.pan);
      case 3:
        return !(this.incorporation_date && this.incorporation_number && !isNullOrUndefined(this.type));
      case 4:
        return !(this.growth_rate && this.net_worth);
      default:
        return false;
    }
  }

  proceed() {
    if (this.count == 4) {
      this.addCompany();
    } else {
      this.count = this.count + 1;
    }
  }

  setNum(num: number) {
    if (this.count > num) {
      this.count = num;
    }
  }

  addCompany() {
    this.userService.addCompany(this.name, this.description, this.incorporation_date, this.incorporation_number,
      this.location, this.phone, this.type + '', this.team_strength, this.growth_rate, this.pan, this.website, this.net_worth,
      this.image, this.profits).then(res => {

      const newNotification = new NotificationBuilder()
        .title('Success')
        .message('Company Successfully Added!')
        .showClose(true)
        .timeout(5000)
        .type(LoanAppNotificationType.SUCCESS)
        .build();

      this.notificationService.showNotification(newNotification);
      const config = new MatDialogConfig();
      config.viewContainerRef = this.viewContainerRef;
      this.dialogRef.close(true);
    });
  }
}
