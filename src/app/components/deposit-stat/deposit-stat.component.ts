import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepositState } from 'app/interface/depositStat';
import { DepositStateCard } from 'app/interface/depositStateCard';
import { Hash } from 'app/interface/hash';
import { HashInfoState } from 'app/interface/hashInfoState';

@Component({
  selector: 'app-deposit-stat',
  templateUrl: './deposit-stat.component.html',
  styleUrls: ['./deposit-stat.component.css']
})
export class DepositStatComponent implements OnInit, OnChanges {

  @Input('currentHash') currentHash: Hash;
  @Input('depositState') depositState: DepositState;
  depositStateCard: DepositStateCard = null;
  hashInfoStat: HashInfoState = { nGames: null, nGamesLose: null, nGamesWin: null, cashOutGames: null, totalBalance: null, totalDeposit: null, totalLose: null };
  displayedColumns: string[] = ['txid', 'amount', 'currentBalance', 'createdAt', 'active'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loaded:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges() {
    this.loaded = this.currentHash != null;
    this.getDepositStat(this.currentHash);
    console.log('deposithash',this.currentHash);
  }

  getDepositStat(currentHash: Hash) {
    if (currentHash && currentHash.address && currentHash.address.deposits && currentHash.address.deposits.length > 0) {
      this.dataSource = new MatTableDataSource(this.currentHash.address.deposits);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      let totalDeposit = 0;
      let totalCurrentBalance = 0;
      let totalLose = 0;
      currentHash.address.deposits.map(deposit => {
        totalDeposit += deposit.amount;
        totalCurrentBalance += deposit.currentBalance;
        totalLose += deposit.currentBalance != 0 ? 0 : deposit.amount;
      });
      this.hashInfoStat.totalDeposit = totalDeposit;
      this.hashInfoStat.totalBalance = totalCurrentBalance;
      this.hashInfoStat.totalLose = totalLose;
    }
  }


  getDepositState(event) {
    this.depositStateCard = event;
  }


}
