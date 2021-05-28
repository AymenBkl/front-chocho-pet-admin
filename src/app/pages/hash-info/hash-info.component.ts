import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hash } from 'app/interface/hash';
import { HashInfoState } from 'app/interface/hashInfoState';
import { HashService } from 'app/services/hash.service';
import { InteractionService } from 'app/services/interaction.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GameService } from 'app/services/game.service';
import { GamedState } from 'app/interface/gameState';
import { DepositState } from 'app/interface/depositStat';
@Component({
  selector: 'app-hash-info',
  templateUrl: './hash-info.component.html',
  styleUrls: ['./hash-info.component.css']
})
export class HashInfoComponent implements OnInit {

  currentHash: Hash;
  hashInfoStat: HashInfoState = {nGames:null,nGamesLose:null,nGamesWin:null,cashOutGames:null,totalBalance:null,totalDeposit:null,totalLose:null};
  displayedColumns: string[] = ['txid', 'amount', 'currentBalance', 'createdAt', 'active'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  gameState: GamedState;
  depositState: DepositState;
  constructor(private route: ActivatedRoute,
              private hashService: HashService,
              private InteractionService: InteractionService,
              private gameService: GameService) {

              }

  ngOnInit(): void {
    this.getCurrentHash();
  }


  getCurrentHash() {
    this.route.params.subscribe(params => {
      this.getHash(params['hashId']);
    });
  }


  getHash(hashId:string) {
    this.InteractionService.displayToast('Loading Hash Info',true,'info');
    this.hashService.checkHash(hashId)
      .then((result: any) => {
        this.InteractionService.closeToast();
        if (result) {
          this.InteractionService.displayToast('Hash Loadded Succesfully',false,'success')
          this.currentHash = result;
          this.getGameState(this.currentHash._id);
          if (this.currentHash.address){
            this.getDepositState(this.currentHash.address._id);

          }
        }
        else if (result && result.length == 0){
          this.InteractionService.displayToast('Their is no hash with this id',false,'warning')
        }
        else {
          this.InteractionService.alertMsg('Error','Error Loading Hash','error')
        }
      })
      .catch(err => {
        console.log(err);
        this.InteractionService.closeToast();
        this.InteractionService.alertMsg('Error','Error Loading Hash','error')
      })
  }

  getGameState(hashId:string) {
    this.gameService.getGameStatHash(hashId)
      .then((result: any) => {
        console.log(result)
        if (result) {
          this.InteractionService.displayToast('Game State Loadded Succesfully',false,'success')
          this.gameState = result;
        }
        else if (result && result.length == 0){
          this.InteractionService.displayToast('Their is no games in this hash with this id',false,'warning')
        }
        else {
          this.InteractionService.alertMsg('Error','Error Loading Game State','error')
        }
      })
      .catch(err => {
        this.InteractionService.closeToast();
        this.InteractionService.alertMsg('Error','Error Loading Game State','error')
      })
  }


  getDepositState(addressId:string) {
    this.gameService.getDepositStatHash(addressId)
      .then((result: any) => {
        console.log(result)
        if (result) {
          this.InteractionService.displayToast('Deposit State Loadded Succesfully',false,'success')
          this.depositState = result;
        }
        else if (result && result.length == 0){
          this.InteractionService.displayToast('Their is no deposit hash with this id',false,'warning')
        }
        else {
          this.InteractionService.alertMsg('Error','Error Loading Deposit State','error')
        }
      })
      .catch(err => {
        this.InteractionService.closeToast();
        this.InteractionService.alertMsg('Error','Error Loading Deposit State','error')
      })
  }


}
