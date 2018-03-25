import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  show: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.show = this.loaderService.loaderVisibility;
  }
}
