import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lastSixMonths } from 'app/functions/lastSixMonths';
import { HashState } from 'app/interface/dashboardHashState';
import { DepositState } from 'app/interface/depositStat';
import { GamedState } from 'app/interface/gameState';
import { GameStateCard } from 'app/interface/gameStateCard';
import { HashStateCard } from 'app/interface/hashStateCard';
import Chart from 'chart.js';
import { DepositStateCard } from '../../interface/depositStateCard';
@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css']
})
export class LineGraphComponent implements OnInit {

  @Input('hashes') hashes: HashState[];
  @Input('games') games: GamedState[];
  @Input('deposits') deposits: DepositState[];
  @Input('type') type: string;
  @Output('depositStateCard') depositStateCard : EventEmitter<DepositStateCard> =  new EventEmitter<DepositStateCard>();
  @Output('hashStateCard') hashStateCard : EventEmitter<HashStateCard> =  new EventEmitter<HashStateCard>();
  @Output('gameStateCard') gameStateCard : EventEmitter<GameStateCard> =  new EventEmitter<GameStateCard>();
  depositToShow: string = 'chartDepositsLineAmount';
  gamesToShow: string = 'chartGamesLineCount';
  hashToShow:string = 'chartHashesLineHash';
  constructor() { }

  ngOnInit(): void {
    console.log("here");
  }

  ngOnChanges() {
    console.log(this.type)
    if (this.type == 'game') {
      this.consructGameLineChart();
    }
    else if (this.type == 'hash') {
      this.consructHashesLineChart(this.hashes);
    }
    else if (this.type == 'deposit') {
      console.log('deposithash',this.deposits);
      this.consructDepositsLineChart();
    }
  }




  private consructHashesLineChart(hashes: HashState[]) {
    if (hashes) {
      let newHash = lastSixMonths().months;
      let monthDays = [];
      let monthsValue = {count:[[], [], [], [], [], []],blocked:[[], [], [], [], [], []],active:[[], [], [], [], [], []],addresses:[[], [], [], [], [], []]};
      let hashStateCard : HashStateCard = {totalActiveHashes:0,totalAddresses:0,totalBlockedHashes:0,totalHashes:0,totalHashesThisMonth:0};
      const thisMonth = new Date().getMonth() + 1;
      hashes.map(hash => {
        console.log(hash);
        for (let key in monthsValue) {
          monthsValue[key][newHash.indexOf(hash._id.month)].push({ x: hash._id.day, y: hash[key] });

        }
          hashStateCard.totalHashes += hash.count;
          hashStateCard.totalAddresses += hash.addresses;
          hashStateCard.totalBlockedHashes += hash.blocked;
          hashStateCard.totalActiveHashes += hash.count - hash.blocked;
          hashStateCard.totalHashesThisMonth += thisMonth == hash._id.month ? hash.count : 0;
      })
      console.log(hashStateCard);
      this.hashStateCard.emit(hashStateCard);
      let newValidData = { count: [], blocked: [], active: [], addresses: [] };

      for (let key in monthsValue) {
        monthsValue[key].map(monthValue => {
          if (monthValue && monthValue.length == 0) {
            monthValue.push({ x: 0, y: 0 });
          }
          monthValue.sort((a, b) => a.x - b.x);
          monthDays.push(monthValue.map((a) => { return a.x }));
          newValidData[key].push(...monthValue);
        })
      }

      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let months = [];
      newHash.map((monthNumber, index) => {
        let currentMonth = monthNames[monthNumber - 1];
        monthDays[index].map(day => {
          months.push(currentMonth + ' - ' + day);
        })
      })
      this.renderHashesChart(months, newValidData.count, 'chartHashesLineHash', '#f0ad4e');
      this.renderHashesChart(months, newValidData.addresses, 'chartHashesLineAddresses', '#5bc0de');
      this.renderHashesChart(months, newValidData.blocked, 'chartHashesLineBlocked', '#d9534f');
      this.renderHashesChart(months, newValidData.active, 'chartHashesLineActive','#5cb85c');
    }

  }

  private consructGameLineChart() {
    if (this.games) {
      let newGame = lastSixMonths().months;
      let monthDays = [];
      let monthsValue = { count: [[], [], [], [], [], []], win: [[], [], [], [], [], []], lose: [[], [], [], [], [], []], active: [[], [], [], [], [], []], withdraw: [[], [], [], [], [], []] };
      let gameStateCard : GameStateCard = {totalActive:0,totalGames:0,totalGamesThisMonth:0,totalLose:0,totalWin:0,totalWithdraw:0};
      const thisMonth = new Date().getMonth() + 1;
      this.games.map(game => {
        for (let key in monthsValue) {
          monthsValue[key][newGame.indexOf(game._id.month)].push({ x: game._id.day, y: game[key] });
        }
        gameStateCard.totalGames += game.count;
        gameStateCard.totalActive += game.active;
        gameStateCard.totalLose += game.lose;
        gameStateCard.totalWithdraw += game.withdraw;
        gameStateCard.totalWin += game.win;
        gameStateCard.totalGamesThisMonth += game._id.month == thisMonth ? game.count : 0;
      })
      this.gameStateCard.emit(gameStateCard);
      let newValidData = { count: [], win: [], lose: [], active: [], withdraw: [] }
      for (let key in monthsValue) {
        monthsValue[key].map(monthValue => {
          if (monthValue && monthValue.length == 0) {
            monthValue.push({ x: 0, y: 0 });
          }
          monthValue.sort((a, b) => a.x - b.x);
          monthDays.push(monthValue.map((a) => { return a.x }));
          newValidData[key].push(...monthValue);
        })
      }
      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let months = [];
      newGame.map((monthNumber, index) => {
        let currentMonth = monthNames[monthNumber - 1];
        monthDays[index].map(day => {
          months.push(currentMonth + ' - ' + day);
        })
      })
      this.renderHashesChart(months, newValidData.count, 'chartGamesLineCount', '#0275d8');
      this.renderHashesChart(months, newValidData.active, 'chartGamesLineActive', '#5bc0de');
      this.renderHashesChart(months, newValidData.win, 'chartGamesLineWin', '#5cb85c');
      this.renderHashesChart(months, newValidData.lose, 'chartGamesLineLose', '#f0ad4e');
      this.renderHashesChart(months, newValidData.withdraw, 'chartGamesLineWithdraw', '#292b2c');
    }

  }

  private consructDepositsLineChart() {
    if (this.deposits) {
      let newDeposit = lastSixMonths().months;
      let monthDays = [];
      let monthsValue = { amounts: [[], [], [], [], [], []], currentBalance: [[], [], [], [], [], []] };
      let depositStateCard : DepositStateCard = {balance:0,totalBalance:0,totalCurrentBalance:0,totalCurrentBalanceLastMonth:0};
      const thisMonth = new Date().getMonth() + 1;
      this.deposits.map(deposit => {
        for (let key in monthsValue) {
          monthsValue[key][newDeposit.indexOf(deposit._id.month)].push({ x: deposit._id.day, y: deposit[key] / 100000000 });

        }
        depositStateCard.totalBalance += deposit.amounts;
        depositStateCard.totalCurrentBalance += deposit.currentBalance;
        depositStateCard.totalCurrentBalanceLastMonth += deposit._id.month == thisMonth ? deposit.currentBalance : 0;
      })
      this.depositStateCard.emit(depositStateCard);
      let newValidData = { amounts: [], currentBalance:[]}
      for (let key in monthsValue) {
        monthsValue[key].map(monthValue => {
          if (monthValue && monthValue.length == 0) {
            monthValue.push({ x: 0, y: 0 });
          }
          monthValue.sort((a, b) => a.x - b.x);
          monthDays.push(monthValue.map((a) => { return a.x }));
          newValidData[key].push(...monthValue);
        })
      }

      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let months = [];
      newDeposit.map((monthNumber, index) => {
        let currentMonth = monthNames[monthNumber - 1];
        monthDays[index].map(day => {
          months.push(currentMonth + ' - ' + day);
        })
      })
      this.renderHashesChart(months, newValidData.amounts, 'chartDepositsLineAmount', '#5cb85c');
      this.renderHashesChart(months, newValidData.currentBalance, 'chartDepositsLineCurrentBalance', '#0275d8');
    }

  }


  private renderHashesChart(months: any[], hashes: any[], canvasId: string, color: string) {
    var hashCanvas = document.getElementById(canvasId);
    var dataFirst = {
      data: hashes,
      fill: false,
      borderColor: color,
      backgroundColor: 'transparent',
      pointBorderColor: color,
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };
    var hashData = {
      labels: months,
      datasets: [dataFirst]
    };

    var chartOptions = {
      legend: {
        display: false,
        position: 'top'
      }
    };

    var lineChart = new Chart(hashCanvas, {
      type: 'line',
      hover: false,
      data: hashData,
      options: chartOptions
    });
  }

  changeHash(id:string) {
    this.hashToShow = id;
  }
  changeDeposit(id: string) {
    this.depositToShow = id;
  }

  changeGame(id: string) {
    this.gamesToShow = id;
  }


}
