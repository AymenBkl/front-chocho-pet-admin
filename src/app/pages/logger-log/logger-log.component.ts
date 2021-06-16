import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { InteractionService } from 'app/services/interaction.service';
import { LoggerServiceService } from 'app/services/logger-service.service';

@Component({
  selector: 'app-logger-log',
  templateUrl: './logger-log.component.html',
  styleUrls: ['./logger-log.component.css']
})
export class LoggerLogComponent implements OnInit {
  logs: any;
  displayedColumns: string[] = ['endPoint', 'msg', 'level', 'service', 'timestamp','status'];
  dataSource;
  expandedElement: any;
  currentLink:string;
  isError:boolean;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private route: ActivatedRoute,
    private logService:LoggerServiceService,
    private interactionService: InteractionService) { }

    ngOnInit(): void {
      this.getCurrentLink();
    }

    getCurrentLink() {
      this.route.params.subscribe(params => {
        this.currentLink = params['link'];
        const level = this.route.snapshot.queryParamMap.get('level');
        console.log(level);
        console.log(this.currentLink);
        if (this.currentLink.includes('error')) {
          this.isError = true;
          this.displayedColumns = ['endPoint', 'msg','error','level', 'service', 'timestamp','status'];
        }
        if (level && this.currentLink && level != '' && this.currentLink != ''){
          this.getLogs(params['link'],level);
        }
        else {
          this.interactionService.displayToast('Inavlid Level',false,'warning');
        }
      });
    }

    getLogs(path:string,level:string) {
      this.interactionService.createLoading("Getting Your Logs");
      this.logService.getLogs(path,level)
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
