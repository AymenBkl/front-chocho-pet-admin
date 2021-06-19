import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Email } from 'app/interface/email';
import { EmailsService } from 'app/services/emails.service';
import { InteractionService } from 'app/services/interaction.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SubscribersComponent implements OnInit,OnDestroy {
  displayedColumns: string[] = ['email', 'sentCoupon', 'status', 'createdAt'];
  dataSource;
  emails: Email[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedElement: any;
  loaded:boolean = false;
  constructor(private emailService: EmailsService,
              private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.getEmails();
  }

  ngOnDestroy(): void {
    this.emailService.onDestroyEmails();
    this.interactionService.closeToast();
    this.interactionService.clearAllToastr();
  }

  getEmails() {
    this.interactionService.createLoading("Loading Emails Please Wait !!");
    this.emailService.getEmails()
      .then((emails:any) => {
        this.loaded = true;
        this.interactionService.closeToast();
        console.log(emails);
        if (emails && emails != false){
          this.interactionService.displayToast('Emails Loaded Succesfully', false, 'success');
            this.emails = emails;
            this.dataSource = new MatTableDataSource(emails);
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            },1000)

        }
        else {
          this.interactionService.displayToast('Something Went Wrong !', false, 'error');
        }
      })
      .catch(err => {
        this.loaded = true;
        this.interactionService.displayToast('Something Went Wrong !', false, 'error');
        this.interactionService.closeToast();

      })
  }

  sendCouponToEmails() {
    let unsentCouponEmails = this.emails.filter(email => email.sentCoupon == false);
    this.emailService.sendEmails(unsentCouponEmails);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
