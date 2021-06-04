import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { callResponseComplaint } from 'app/functions/modalsCall';
import { Contact } from 'app/interface/contact';
import { Email } from 'app/interface/email';
import { EmailsService } from 'app/services/emails.service';
import { InteractionService } from 'app/services/interaction.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ContactsComponent implements OnInit,OnDestroy {
  displayedColumns: string[] = ['email', 'name', 'subject','replied', 'createdAt','reply'];
  dataSource;
  contacts: Contact[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedElement: any;
  loaded:boolean = false;
  constructor(private emailService: EmailsService,
              private interactionService: InteractionService,
              private dialog: MatDialog) { }


  ngOnInit(): void {
    this.getContacts();
  }

  ngOnDestroy(): void {
    this.emailService.onDestroyContacts();
    this.interactionService.closeToast();
    this.interactionService.clearAllToastr();
  }


  getContacts() {
    this.interactionService.createLoading("Loading Contacts Please Wait !!");
    this.emailService.getContacts()
      .then((contacts:any) => {
        this.loaded = true;
        this.interactionService.closeToast();
        console.log(contacts);
        if (contacts && contacts != false){
          this.interactionService.displayToast('Emails Contacts Succesfully', false, 'success');
          this.contacts = contacts;
          this.dataSource = new MatTableDataSource(contacts);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
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

  reply(contact:Contact) {
    let dialogRef = callResponseComplaint(this.dialog,{contact:contact});
    dialogRef.afterClosed()
      .subscribe(result => {
        console.log(result);
        if (result && result != false){
          contact.replied = true;
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
