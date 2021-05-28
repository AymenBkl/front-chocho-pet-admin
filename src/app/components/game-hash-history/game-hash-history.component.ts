import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'app/interface/game';
import { GamedState } from 'app/interface/gameState';
import { GameStateCard } from 'app/interface/gameStateCard';
import { Hash } from 'app/interface/hash';
import { HashInfoState } from 'app/interface/hashInfoState';

@Component({
  selector: 'app-game-hash-history',
  templateUrl: './game-hash-history.component.html',
  styleUrls: ['./game-hash-history.component.css']
})
export class GameHashHistoryComponent implements OnInit {

  historyGames: Game[];
  @Input('currentHash') gameHash: Hash;
  @Input('gameState') gameState: GamedState;
  gameStateCard: GameStateCard = null;

  hashInfoStat: HashInfoState = {nGames:null,nGamesLose:null,nGamesWin:null,cashOutGames:null,totalBalance:null,totalDeposit:null,totalLose:null};

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.affectHistoryGames();
  }

  affectHistoryGames() {
    if (this.gameHash && this.gameHash.games && this.gameHash.games.length > 0){
      this.historyGames = this.gameHash.games;
      this.getNumberGames(this.gameHash);
      console.log(this.historyGames);
    }
  }


  getNumberGames(currentHash: Hash) {
    this.hashInfoStat.nGames = currentHash.games.length;
    let nGamesWin = 0;
    let nGamesLose = 0;
    let withdrawGames = 0;
    currentHash.games.map(game => {
      if (game.status == 'win'){
        nGamesWin += 1;
      }
      else if (game.status == 'lose') {
        nGamesLose += 1;
      }
      else if (game.status == 'withdraw'){
        withdrawGames += 1;
      }
    })

    this.hashInfoStat.nGamesWin = nGamesWin;
    this.hashInfoStat.nGamesLose = nGamesLose;
    this.hashInfoStat.cashOutGames = withdrawGames;
  }

  getGameStateCard($event) {
    this.gameStateCard = $event;
  }

}
