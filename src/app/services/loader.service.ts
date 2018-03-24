import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class LoaderService {

  private loaderVisibilitySource = new BehaviorSubject<boolean>(false);
  loaderVisibility = this.loaderVisibilitySource.asObservable();

  private showCount = 0;

  constructor() {
  }

  showLoader() {
    this.showCount++;
    this.loaderVisibilitySource.next(true);
  }

  hideLoader() {
    this.showCount--;
    if (this.showCount <= 0) {
      this.loaderVisibilitySource.next(false);
    }
  }
}
