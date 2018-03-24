import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {LoaderService} from "./loader.service";
import {Router} from "@angular/router";
import {AuthenticationService} from './authentication.service';
import {NotificationService} from "./notificaton.service";

@Injectable()
export class NetworkService {

  http: Http;
  loaderService: LoaderService;
  router: Router;
  notificationService: NotificationService;
  authenticaltion: AuthenticationService;

  constructor(http: Http, loaderService: LoaderService, router: Router, notificationService: NotificationService,
              authenticaltion: AuthenticationService) {
    this.http = http;
    this.loaderService = loaderService;
    this.router = router;
    this.notificationService = notificationService;
    this.authenticaltion = authenticaltion;
  }

}
