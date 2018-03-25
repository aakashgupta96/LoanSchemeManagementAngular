import {Component} from "@angular/core";

@Component({
  selector: 'app-not-found',
  template: `
    <h1>Error 404! Not Found!</h1>
  `,
  styles: ['h1 { font-weight: normal; }']
})
export class NotFoundComponent {

  constructor() {
  }
}
