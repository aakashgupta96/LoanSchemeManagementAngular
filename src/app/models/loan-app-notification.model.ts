export class LoanAppNotification {
  title: string;
  message: string;
  showClose: boolean;
  timeout: number; //milliseconds
  type: LoanAppNotificationType;
  icon_link: string;

  constructor() {
  }
}

export enum LoanAppNotificationType {
  GENERAL,
  ALERT,
  NEW,
  INFORMATION,
  SUCCESS,
  ERROR
}
