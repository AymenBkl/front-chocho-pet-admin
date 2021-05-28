import { Component, OnInit } from '@angular/core';
import { IconsService } from './services/icons.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  constructor(private iconService: IconsService) {

  }
  ngOnInit() {
    AOS.init({
      duration: 800, // values from 0 to 3000, with step 50ms
      once: true,
    });
    this.iconService.registerIcons();
  }
}
