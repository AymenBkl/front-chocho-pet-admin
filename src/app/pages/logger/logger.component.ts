import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goTo(link:string,level:string) {
    window.open(`/#/logs/${link}?level=${level}`, '_blank')
  }

}
