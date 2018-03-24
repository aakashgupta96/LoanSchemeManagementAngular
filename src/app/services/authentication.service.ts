import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {KEYS} from '../constants/constant.constant';
import {LoginResponse} from '../network/responses/login.response';
import {Observable} from 'rxjs/Observable';
import {StorageService} from "./storage.service";

@Injectable()
export class AuthenticationService {

  currentUser: User;
  accessToken: string;

  loginStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  loginStatusStream: Observable<boolean> = this.loginStatusSubject.asObservable();

  constructor(private storage: StorageService) {
  }

  getUser(): User {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    if(this.accessToken == null){
      this.accessToken = this.storage.fetchFromLocal<string>(KEYS.ACCESS_TOKEN);
    }
    if(this.currentUser == null){
      this.currentUser = this.storage.fetchFromLocal<User>(KEYS.USER);
    }
    return this.accessToken != null && this.currentUser != null;
  }

  setLoginResponse(apiResponse: LoginResponse){
    if(apiResponse && apiResponse.user_access_token){
      this.storage.storeInLocal(KEYS.ACCESS_TOKEN, apiResponse.user_access_token);
      this.loginStatusSubject.next(true);
    }
    this.storeUser(apiResponse.user);
  }

  storeUser(user) {
    this.storage.storeInLocal(KEYS.USER, user);
  }

  logout(){
    this.accessToken = null;
    this.currentUser = null;
    this.storage.removeFromLocal(KEYS.ACCESS_TOKEN);
    this.storage.removeFromLocal(KEYS.USER);
    this.storage.removeFromLocal(KEYS.DOUBT_SESSION_UUID);
    this.loginStatusSubject.next(false);
  }


}
