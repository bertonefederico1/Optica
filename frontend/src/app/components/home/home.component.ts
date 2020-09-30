import { Component, OnInit } from '@angular/core';
import { interval } from "rxjs";
import * as moment from 'moment'
moment.locale('es');
moment().format('LL');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  currentDateAndTime: string;

  ngOnInit(): void {
    const ejecuteFunction = interval(1000);
    ejecuteFunction.subscribe(() => {
      this.currentDateAndTime = moment().format('LL, H:mm:ss');
    });
  }

  getCurrentDateAndTime(){
    this.currentDateAndTime = moment().format('MMMM Do YYYY, h:mm:ss a');
  }

}
