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

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  login(email: string, password: string): Promise<LoginResponse> {
    let params = new URLSearchParams();
    params.set("email", email);
    params.set("password", password);
    return new CallBuilder<LoginResponse>(this.networkService, RequestMethod.Post, URLS.LOGIN).parseTo(LoginResponse).params(params).build().execute().then((apiResponse) => {
      console.log('here')
      this.authenticationService.setLoginResponse(apiResponse);
      return apiResponse;
    });
  }


  logout(): void {
    new CallBuilder<any>(this.networkService, RequestMethod.Get, URLS.LOGOUT).buildAuthenticatedCall().execute().then(res => {
      this.authenticationService.logout();
    });
  }
}
