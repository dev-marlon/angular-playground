import { Component, Inject, OnInit } from '@angular/core';
import { APP_CONSTANTS, AppConstantsInterface } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(@Inject(APP_CONSTANTS) private appConstants: AppConstantsInterface) {}

  ngOnInit() {
    console.log(this.appConstants);
  }
}
