import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Complaint } from 'app/interface/complaint';
import { Withdraw } from 'app/interface/withdraw';
import { GameService } from 'app/services/game.service';
import { InteractionService } from 'app/services/interaction.service';

@Component({
  selector: 'app-withdraws',
  templateUrl: './withdraws.component.html',
  styleUrls: ['./withdraws.component.css'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class WithdrawsComponent implements OnInit {

  withdraws: Withdraw[];
  state: string[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'txid', 'amount', 'currentBalance', 'active', 'createdAt','amountToWithdraw'];
  dataSource;
  constructor(private interactionService: InteractionService,
    private gameService: GameService) { }

  ngOnInit(): void {
    this.getWithdraws()
  }


  getWithdraws() {
    this.interactionService.displayToast('Getting Withdraws', true, 'info');
    this.gameService.getWithdraws()
      .then((result: any) => {
        console.log(result);
        this.interactionService.closeToast();
        if (result && !result.status && result != false) {
          this.interactionService.displayToast('Withdraws Loadded', false, 'success');
          this.withdraws = result;
          this.state = new Array(this.withdraws.length).fill('collapsed');
        }
        else if (result && result.status && result.status == 'NOT FOUND') {
          this.interactionService.displayToast('You have no Withdraws', false, 'warning');
        }
        else {
          this.interactionService.displayToast('Something Went Wrong !', false, 'error');
        }

      })
      .catch(err => {
        this.interactionService.displayToast('Something Went Wrong !', false, 'error');
      })
  }

  toggle(index: number): void {

    const colapsedIndex = this.state.indexOf('expanded');
    colapsedIndex != -1 ? this.state[colapsedIndex] = 'collapsed': '';
    this.state[index] = this.state[index] === 'collapsed' ? 'expanded' : 'collapsed';

    this.dataSource = new MatTableDataSource(this.getDeposits(this.withdraws[index].deposits));
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDeposits(deposits) {
    let newDeposits = []
    deposits.map(deposit => {
      deposit.deposit.amountToWithdraw = deposit.amount;
      console.log(deposit.deposit);
      newDeposits.push(deposit.deposit);
    })
    return newDeposits;
  }

}
