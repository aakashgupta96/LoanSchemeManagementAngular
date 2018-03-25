import {Component} from "@angular/core";

@Component({
  selector: 'app-internal-server-error',
  template: `
    <h1>Internal Server Error!</h1>
  `,
  styles: ['h1 { font-weight: normal; }']
})
export class InternalServerErrorComponent {

  constructor() {
  }
}
