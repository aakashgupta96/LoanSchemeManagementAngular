import {Type, Exclude} from "class-transformer";
import {LoanAppError} from "../loan-app.error";

export class APIResponse<T> {

  @Type(options => (options.newObject as APIResponse<T>).type)
  data: T;
  message: string;

  @Type(() => LoanAppError)
  error: LoanAppError;

  @Exclude()
  type: Function;

  constructor(type: Function) {
    this.type = type;
  }

}
