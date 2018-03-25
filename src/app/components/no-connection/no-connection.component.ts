import {Component, OnInit} from '@angular/core';
// import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Subscriber} from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Rx'


@Component({
  selector: 'app-no-connection',
  templateUrl: './no-connection.component.html',
  styleUrls: ['./no-connection.component.css']
})
export class NoConnectionComponent implements OnInit {

  isConnected: boolean = true;
  sub: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.sub = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false)
    ).subscribe(status => {
      this.isConnected = status;
    });
  }
}
