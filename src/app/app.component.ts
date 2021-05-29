import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  constructor() {

  }
  ngOnInit() {
    AOS.init({
      duration: 800, // values from 0 to 3000, with step 50ms
      once: true,
    });
  }
}
