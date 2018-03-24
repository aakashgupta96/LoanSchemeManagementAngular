import {Headers, RequestMethod, URLSearchParams} from '@angular/http';
import {Call} from './call';
import {KEYS, URLS} from '../constants/constant.constant';
import {isNullOrUndefined} from 'util';
import {NetworkService} from '../services/network.service';

export class CallBuilder<T> {

  public requestMethod: RequestMethod;
  public call_params: URLSearchParams;
  public call_headers: Headers;
  public call_body: any;
  public call_url: string;
  public call_type: Function = Object;
  public call_showLoader: boolean = true;


  constructor(private networkService: NetworkService, private method: RequestMethod, private url: string) {
    this.requestMethod = method;
    this.call_url = URLS.BASE_URL + url;
    this.call_headers = new Headers();
    this.call_params = new URLSearchParams();
  }

  public build(): Call<T> {
    if (isNullOrUndefined(this.call_url)) {
      throw "Call Url is required";
    }
    if (isNullOrUndefined(this.requestMethod)) {
      throw "Request Method is required";
    }
    return new Call(this, this.networkService);
  }

  public buildAuthenticatedCall(): Call<T> {
    let accessToken: string = localStorage.getItem(KEYS.ACCESS_TOKEN);

    if (accessToken && accessToken != "undefined" && accessToken != "null") {
      accessToken = <string>JSON.parse(accessToken);
    } else {
      accessToken = "";
    }
    this.call_headers.set("Authorization", "Token " + accessToken);
    return this.build();
  }


  public headers(headers: Headers): CallBuilder<T> {
    this.call_headers = headers;
    return this;
  }

  public params(params: URLSearchParams): CallBuilder<T> {
    this.call_params = params;
    return this;
  }


  public body(body: any): CallBuilder<T> {
    this.call_body = body;
    return this;
  }

  public parseTo(type: Function): CallBuilder<T> {
    this.call_type = type;
    return this;
  }

  public showLoader(showLoader: boolean): CallBuilder<T> {
    this.call_showLoader = showLoader;
    return this;
  }

}
