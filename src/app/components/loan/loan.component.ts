import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent {

  display: string;

  constructor() {
  }

  matches(str: string) {
    return this.display == str;
  }

  setString(str: string) {
    this.display = str;
  }
}
