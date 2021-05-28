import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { callResponseComplaint } from 'app/functions/modalsCall';
import { Complaint } from 'app/interface/complaint';
import { HashService } from 'app/services/hash.service';
import { InteractionService } from 'app/services/interaction.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ComplaintsComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'description', 'type', 'createdAt', 'status'];
  dataSource;
  complaints: Complaint[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedElement: any;
  loaded:boolean = false;
  constructor(private interactionService: InteractionService,
              private hashService: HashService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getComplaints();
  }

  getComplaints() {
    this.interactionService.displayToast('Getting Your Complaints', true, 'info');
    this.hashService.complaints()
      .then((result: any) => {
        console.log(result);
        this.loaded = true;
        this.interactionService.closeToast();
        if (result && !result.status && result != false){
          this.interactionService.displayToast('Complaints Loadded', false,'success');
          this.complaints = result;
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        else if (result &&  result.status && result.status == 'NOT FOUND'){
          this.interactionService.displayToast('You have no Complaints', false, 'warning');
        }
        else {
          this.interactionService.displayToast('Something Went Wrong !', false, 'error');
        }

      })
      .catch(err => {
        this.loaded = true;
        this.interactionService.displayToast('Something Went Wrong !',false , 'error');
      })
  }


  reply(complaint:Complaint) {
    let dialogRef = callResponseComplaint(this.dialog,{complaint:complaint});
    dialogRef.afterClosed()
      .subscribe(result => {
        console.log(result);
        complaint = result
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
