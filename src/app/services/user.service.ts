import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {URLS} from '../constants/constant.constant';
import {RequestMethod, URLSearchParams} from '@angular/http';
import {LoginResponse} from '../network/responses/login.response';
import {CallBuilder} from '../network/call.builder';
import {Observable} from 'rxjs';
import {NetworkService} from './network.service';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class UserService {

  loginStatusStream: Observable<boolean>;

  constructor(private authenticationService: AuthenticationService,
              private networkService: NetworkService) {
    this.loginStatusStream = this.authenticationService.loginStatusSubject.asObservable();
  }

  getUser(): User {
    return this.authenticationService.getUser();
  }

  login(email: string, password: string): Promise<LoginResponse> {
    let params = new URLSearchParams();
    params.set("email", email);
    params.set("password", password);
    return new CallBuilder<LoginResponse>(this.networkService, RequestMethod.Post, URLS.LOGIN).params(params).build().execute().then((apiResponse) => {
      this.authenticationService.setLoginResponse(apiResponse);
      return apiResponse;
    });
  }


  logout(): Promise<any> {
    return new CallBuilder<any>(this.networkService, RequestMethod.Post, URLS.LOGOUT).buildAuthenticatedCall().execute().then(res => {
      this.authenticationService.logout();
      return res;
    });
  }

  updateProfile(name: string, phone: string, address: string, image: string): Promise<any> {
    let body = {
      name,
      address,
      phone,
      image
    };
    return new CallBuilder(this.networkService, RequestMethod.Post, URLS.EDIT_USER_DETAILS).body(body)
      .buildAuthenticatedCall().execute().then(response => {
        return response;
      });
  }
}
