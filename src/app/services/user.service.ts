import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {KEYS, URLS} from '../constants/constant.constant';
import {RequestMethod, URLSearchParams} from '@angular/http';
import {LoginResponse} from '../network/responses/login.response';
import {CallBuilder} from '../network/call.builder';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {NetworkService} from './network.service';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class UserService {

  loginStatusStream: Observable<boolean>;

  pendingNotificationsSubject = new BehaviorSubject<number>(0);
  pendingNotificationsStream: Observable<number> = this.pendingNotificationsSubject.asObservable();

  userSocket;
  employeeSocket;

  constructor(private authenticationService: AuthenticationService,
              private networkService: NetworkService,
              private router: Router) {
    this.loginStatusStream = this.authenticationService.loginStatusSubject.asObservable();
  }

  getUser(): User {
    return this.authenticationService.getUser();
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  login(): void {
    //return Promise<LoginResponse>
  }


  logout(): void {
    this.authenticationService.logout();
  }

  logoutFromServer() {
    return new CallBuilder<any>(this.networkService, RequestMethod.Get, URLS.LOGOUT).buildAuthenticatedCall().execute();
  }

  logoutWithoutRedirect() {
    this.logoutFromServer();
    this.authenticationService.logout();
  }

  storeUser(user) {
    this.authenticationService.storeUser(user);
  }
}
