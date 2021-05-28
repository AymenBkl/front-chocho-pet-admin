import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Log } from 'app/interface/log';
import { InteractionService } from 'app/services/interaction.service';
import { LogsServiceService } from 'app/services/logs-service.service';

@Component({
  selector: 'app-logs-detail',
  templateUrl: './logs-detail.component.html',
  styleUrls: ['./logs-detail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LogsDetailComponent implements OnInit {

  logs: Log[];
  displayedColumns: string[] = ['endPoint', 'msg', 'level', 'service', 'timestamp','status'];
  dataSource;
  expandedElement: any;
  currentLink:string;
  isError:boolean;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private route: ActivatedRoute,
              private logService:LogsServiceService,
              private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.getCurrentLink();
  }

  getCurrentLink() {
    this.route.params.subscribe(params => {
      this.currentLink = params['link'];
      if (this.currentLink.includes('error')) {
        this.isError = true;
        this.displayedColumns = ['endPoint', 'msg','error','level', 'service', 'timestamp','status'];
      }
      this.getLogs(params['link']);
    });
  }

  getLogs(path:string) {
    this.interactionService.createLoading("Getting Your Logs");
    this.logService.getLog(path)
      .then((result:any) => {
        this.interactionService.closeToast();
        this.logs = [];
        if (result && result != false){
          this.interactionService.displayToast('Logs Loadded Succesfully',false,'success');
          this.logs = result;
          this.dataSource = new MatTableDataSource(this.logs);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        else if (result && result.length == 0 ) {
          this.interactionService.displayToast('No Logs',false,'warning');

        }
        else {
          this.interactionService.displayToast('Something Went Wrong !',false,'error');
        }
      })
      .catch(err => {
        this.logs = [];
        this.interactionService.closeToast();
        if (err && err.errmsg){
          this.interactionService.displayToast(err.errmsg,false,'warning');
        }
        else {
          this.interactionService.displayToast('Something Went Wrong !',false,'error');
        }

      })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




}
