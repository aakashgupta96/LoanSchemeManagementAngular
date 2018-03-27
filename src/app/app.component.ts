import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isConnected: Observable<boolean>;

  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      this.isConnected = Observable.merge(
        Observable.of(navigator.onLine),
        Observable.fromEvent(window, 'online').map(() => true),
        Observable.fromEvent(window, 'offline').map(() => false));
    });
  }

  ngOnInit() {
  }

}
