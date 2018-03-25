import {isNullOrUndefined} from "util";
import {
  LoanAppNotification, LoanAppNotificationType
} from "../../models/loan-app-notification.model";

export class NotificationBuilder {

  loanAppNotification: LoanAppNotification;

  private notiTitle: string;
  private notiMessage: string;
  private notiShowClose: boolean = true;
  private notiTimeout: number;
  private notiType: LoanAppNotificationType = LoanAppNotificationType.GENERAL;
  private notiImageLink: string;
  private notiIconLink: string;

  constructor() {
  }

  title(title: string): NotificationBuilder {
    this.notiTitle = title;
    return this;
  }

  message(message: string): NotificationBuilder {
    this.notiMessage = message;
    return this;
  }

  //default: true
  showClose(showClose: boolean): NotificationBuilder {
    this.notiShowClose = showClose;
    return this;
  }

  timeout(timeout: number): NotificationBuilder {
    this.notiTimeout = timeout;
    return this;
  }


  type(type: LoanAppNotificationType): NotificationBuilder {
    this.notiType = type;
    return this;
  }

  //for internal use only
  private getIconLink() {
    if (!isNullOrUndefined(this.notiIconLink)) {
      return this.notiIconLink;
    } else {
      switch (this.notiType) {
        case LoanAppNotificationType.SUCCESS: {
          return '../assets/icons/success.png';
        }
        case LoanAppNotificationType.ERROR: {
          return '../assets/icons/error.png';
        }
        case LoanAppNotificationType.INFORMATION: {
          return '../assets/icons/info.png';
        }
        case LoanAppNotificationType.ALERT: {
          return '../assets/icons/alert.png';
        }
        default: {
          return '../assets/icons/info.png';
        }
      }
    }
  }

  build(): LoanAppNotification {
    let options: LoanAppNotification = {
      title: this.notiTitle,
      message: this.notiMessage,
      showClose: this.notiShowClose,
      timeout: this.notiTimeout,
      type: this.notiType,
      icon_link: this.getIconLink(),
    };

    this.loanAppNotification = options;
    return this.loanAppNotification;
  }
}
