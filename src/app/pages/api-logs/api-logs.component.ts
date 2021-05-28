import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api-logs',
  templateUrl: './api-logs.component.html',
  styleUrls: ['./api-logs.component.css']
})
export class ApiLogsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goTo(link:string) {
    window.open(`/#/logs/${link}`, '_blank')
  }

}
