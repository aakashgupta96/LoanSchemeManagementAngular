import {Component} from "@angular/core";

@Component({
  selector: 'app-unauthorised',
  template: `
    <h1>You are unauthorized here!</h1>
  `,
  styles: ['h1 { font-weight: normal; }']
})
export class UnauthorizedComponent {

  constructor() {
  }
}
