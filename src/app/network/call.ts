import {RequestMethod, Http, Headers, URLSearchParams, RequestOptions, Response} from "@angular/http";
import {CallBuilder} from "./call.builder";
import "rxjs/add/operator/toPromise";
import {APIResponse} from "./responses/api.response";
import {isNullOrUndefined} from "util";
import {LoanAppError} from "./loan-app.error";
import {plainToClassFromExist} from "class-transformer";
import {NetworkService} from "../services/network.service";
import {LoaderService} from "../services/loader.service";
import {LoanAppNotificationType} from "../models/loan-app-notification.model";
import {Observable} from "rxjs";
import {NotificationBuilder} from "../misc/notification/notification.builder";

export class Call<T> {

  static readonly INTERNAL_SERVER_ERROR: string = "Internal server error. Please contact Coding Ninjas Team.";

  private requestMethod: RequestMethod;
  private headers: Headers;
  private params: URLSearchParams;
  private url;
  private body: any;
  private type: Function;
  private showLoader: boolean;
  private http: Http;
  private loaderService: LoaderService;
  private isConnected: boolean;

  constructor(private builder: CallBuilder<T>,
              private networkService: NetworkService) {
    this.http = networkService.http;
    this.loaderService = networkService.loaderService;
    this.requestMethod = builder.requestMethod;
    this.params = builder.call_params;
    this.headers = builder.call_headers;
    this.url = builder.call_url;
    this.body = builder.call_body;
    this.type = builder.call_type;
    this.showLoader = builder.call_showLoader;
    let isConnected = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false));
    isConnected.subscribe(status => {
      this.isConnected = status;
    })

  }

  public execute(): Promise<any> {

    let options = new RequestOptions();
    options.body = this.body;
    options.headers = this.headers;
    options.params = this.params;
    if (this.showLoader) {
      this.loaderService.showLoader();
    }
    switch (this.requestMethod) {
      case RequestMethod.Get:
        return this.http.get(this.url, options).toPromise().then(res => {
          return this.extractData(this.type, res)
        })
          .catch(error => {
            return this.handleError(error)
          });
      case RequestMethod.Post:
        return this.http.post(this.url, this.body, options).toPromise().then(res => {
          return this.extractData(this.type, res)
        })
          .catch(error => {
            return this.handleError(error)
          });
      case RequestMethod.Delete:
        return this.http.delete(this.url, options).toPromise().then(res => {
          return this.extractData(this.type, res)
        })
          .catch(error => {
            return this.handleError(error)
          });
      case RequestMethod.Put:
        return this.http.put(this.url, this.body, options).toPromise().then(res => {
          return this.extractData(this.type, res)
        })
          .catch(error => {
            return this.handleError(error)
          });
      case RequestMethod.Patch:
        return this.http.patch(this.url, this.body, options).toPromise().then(res => {
          return this.extractData(this.type, res)
        })
          .catch(error => {
            return this.handleError(error)
          });
      case RequestMethod.Head:
        return this.http.head(this.url, options).toPromise().then(res => {
          return this.extractData(this.type, res)
        })
          .catch(error => {
            return this.handleError(error)
          });
      case RequestMethod.Options:
        return this.http.options(this.url, options).toPromise().then(res => {
          return this.extractData(this.type, res)
        })
          .catch(error => {
            return this.handleError(error)
          });
      default:
        if (this.showLoader) {
          this.loaderService.hideLoader();
        }
        return null;
    }
  }

  private handleError(error: Response | any) {

    if (this.showLoader) {
      this.loaderService.hideLoader();
    }

    if (!this.isConnected) {
      return Promise.reject(LoanAppError.NO_CONNECTION);
    }

    if (error instanceof LoanAppError) {
      if (error.code == 101) {
        this.networkService.authenticaltion.logout();

        this.networkService.router.navigate(['/app/login'], {
          queryParams: {
            redirect: this.networkService.router.url,
            logged_out: true
          }
        });

      }
      else if (error.code == 805) {

        this.networkService.router.navigate(['/unauthorized'], {replaceUrl: true});

      }
      return Promise.reject(error);
    }

    let codezenError: LoanAppError = LoanAppError.INTERNAL_SERVER_ERROR;
    if (error instanceof Response) {
      if (error.status == 404) {
        this.networkService.router.navigate(['/fourofour'], {replaceUrl: true});
        codezenError = LoanAppError.NOT_FOUND;
      }
      else if (error.status == 422 || error.status == 0) {
        this.somethingWentWrong(error);
      }
      else if (error.status == 401) {
        this.networkService.router.navigate(['/unauthorized'], {replaceUrl: true});
        codezenError = LoanAppError.UNAUTHORIZED;
      }
      else {
        codezenError = new LoanAppError(error.status, error.statusText);
      }
    }
    if (codezenError.code == 500) {
      this.somethingWentWrong(error);

    }
    return Promise.reject(codezenError);
  }

  somethingWentWrong(error: Response | any) {
    let newNotification = new NotificationBuilder()
      .title('Error')
      .message('Something Went Wrong')
      .timeout(5000)
      .type(LoanAppNotificationType.ERROR)
      .build();

    this.networkService.notificationService.showNotification(newNotification);
  }

  private extractData(type: Function, res: Response) {
    if (this.showLoader) {
      this.loaderService.hideLoader();
    }
    if (res.status == 200) {
      let bodyJSON = res.json() || null;
      if (!isNullOrUndefined(bodyJSON)) {
        let body: APIResponse<T> = plainToClassFromExist(new APIResponse<T>(type), bodyJSON);
        if (!isNullOrUndefined(body.error)) {
          return Promise.reject(body.error);
        }
        if (!isNullOrUndefined(body.data)) {
          return Promise.resolve(body.data);
        }
      }
    }
    return Promise.reject(Call.INTERNAL_SERVER_ERROR);
  }
}
