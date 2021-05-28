import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HashResponse } from 'app/interface/hashResponse';
import { MatPaginator } from '@angular/material/paginator';
import { HashService } from 'app/services/hash.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { InteractionService } from 'app/services/interaction.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'table-cmp',
  moduleId: module.id,
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TableComponent implements OnInit {
  hashes: HashResponse[] = [];
  displayedColumns: string[] = ['_id', 'hashId', 'address', 'createdAt', 'games', 'deposits', 'passwordChange', 'status'];
  dataSource;
  expandedElement: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private hashService: HashService,
    private InteractionService: InteractionService) {

  }
  ngOnInit() {
    this.getHashes();

  }

  ngAfterViewInit() {

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getHashes() {
    this.InteractionService.displayToast('Loading Hashes', true, 'info');
    this.hashService.getHashes()
      .then((result: any) => {
        this.InteractionService.closeToast();
        if (result && result.length > 0) {
          this.InteractionService.displayToast('Hashes Loadded Succesfully', false, 'success')
          this.hashes = result;
          this.dataSource = new MatTableDataSource(this.hashes);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        }
        else if (result && result.length == 0) {
          this.InteractionService.displayToast('Their is no hashes', false, 'warning')
        }
        else {
          this.InteractionService.alertMsg('Error', 'Error Loading Hashes', 'error')
        }
      })
      .catch(err => {
        this.InteractionService.closeToast();
        this.InteractionService.alertMsg('Error', 'Error Loading Hashes', 'error')
      })
  }

  goHashInfo(hashId: string) {
    window.open(`/#/info/${hashId}`, '_blank')
  }


  async blockHash(element: HashResponse, status: string) {
    return new Promise((resolve, reject) => {
      this.hashService.updateHashStatus(element.hashId, status)
        .then((result) => {
          console.log(result);
          if (result && result != false) {
            element.status = status;
            this.InteractionService.alertMsg('Success', 'Hash Blocked Successfully', 'success')
          }
          else {
            this.InteractionService.showValidationError('Hash Not Found !');
            resolve(false);
          }
        })
        .catch((err) => {
          console.log(err);
          this.InteractionService.showValidationError(err.errmsg);
          reject(err);
        })
    })

  }

  async buildConfirmBox(element: HashResponse) {
    let msg = "Are You Sure !";
    let text = '';
    let icon = 'warning';
    let confirmBtn = '';
    let cancelBtn = 'Cancel';
    let newStatus = ''
    if ((element.status && element.status == 'active') || (!element.status)) {
      text = ' Do You Want To Block This Hash';
      confirmBtn = 'Block Hash';
      newStatus = 'blocked';
    }
    else {
      text = 'Do You Want To UnBlock This Hash';
      confirmBtn = "UnBlock Hash",
        newStatus = 'active';
    }

    Swal.fire({
      title: msg,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: confirmBtn,
      cancelButtonText: cancelBtn,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return this.blockHash(element, newStatus)
          .then((result) => {
          })
          .catch(err => {
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value || result.isConfirmed) {
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.InteractionService.alertMsg('Canceled', 'Operation Canceled', 'warning')
      }
    })

  }



}
