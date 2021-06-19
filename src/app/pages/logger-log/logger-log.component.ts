import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { InteractionService } from 'app/services/interaction.service';
import { LoggerServiceService } from 'app/services/logger-service.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-logger-log',
  templateUrl: './logger-log.component.html',
  styleUrls: ['./logger-log.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LoggerLogComponent implements OnInit {
  logs: any;
  displayedColumns: string[] = ['level','type', 'createdAt'];
  dataSource;
  expandedElement: any;
  currentLink:string;
  isError:boolean;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loaded:boolean = false;
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
          this.loaded = true;
          this.interactionService.closeToast();
          this.logs = [];
          if (result  && result.status == 200 && result.object.length > 0){
            this.interactionService.displayToast('Logs Loadded Succesfully',false,'success');
            this.logs = result.object;
            console.log(this.logs);
            this.dataSource = new MatTableDataSource(this.logs);
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            },1000)
          }
          else if (result && result.status == 404 && result.object.length == 0 ) {
            this.interactionService.displayToast('No Logs',false,'warning');

          }
          else {
            this.interactionService.displayToast('Something Went Wrong !',false,'error');
          }
        })
        .catch(err => {
          this.loaded = true;
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
