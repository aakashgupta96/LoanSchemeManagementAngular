import {User} from "../../models/user.model";
import {Type} from "class-transformer";
export class LoginResponse {

  constructor(){}

  @Type(() => User)
  user: User;
  user_access_token: string;
}
