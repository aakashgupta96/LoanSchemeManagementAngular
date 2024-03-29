import {Injectable} from "@angular/core";

@Injectable()
export class StorageService {

  constructor() { }

  storeInLocal(key: string, value: any) {
    if (value) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  fetchFromLocal<T>(key: string): T {
    let value: string = localStorage.getItem(key);

    if (value && value != "undefined" && value != "null") {
      return <T>JSON.parse(value);
    }

    return null;
  }

  removeFromLocal(key: string){
    localStorage.removeItem(key);
  }
}
