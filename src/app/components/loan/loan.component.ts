import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  display = "schemes";

  schemes: any[];
  ministries: any[];
  departments: any[];

  selectedMinistry: number;
  selectedDept: number;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.load_data().then(res => {
      this.schemes = res.schemes;
      this.ministries = res.ministries;
      this.departments = res.departments;
    })
  }

  matches(str: string) {
    return this.display == str;
  }

  setString(str: string) {
    this.display = str;
  }

  showingDepts() {
    return (this.departments && this.departments.length > 0) ? this.departments.filter((it) => (it.ministry_id == this.selectedMinistry)) : [];
  }

  showingSchemes() {
    return (this.schemes && this.schemes.length > 0) ? this.schemes.filter((it) => (it.department_id == this.selectedDept)) : [];
  }
}
