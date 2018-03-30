import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent {

	display :string;
	constructor(){
	
	}

	matches(abe: string) {
		return this.display == abe;
	}

	setString(ab: string){
		console.log('set', ab)
		this.display = ab;
	}
}
