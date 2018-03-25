import {Injectable, ErrorHandler} from "@angular/core";
import {isNullOrUndefined} from "util";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";

@Injectable()
export class LoanAppErrorHandler implements ErrorHandler {

  constructor() {
  }

  handleError(err: any): void {
    console.error("Error Handler",err);

    if (!environment.production) {
      //DO NOT REMOVE THIS CONSOLE LOG
      console.error(err)
    }
  }

  setUser(user: User): void{
    if(!isNullOrUndefined(user)){
    }
  }

  removeUser(): void{
  }
}
