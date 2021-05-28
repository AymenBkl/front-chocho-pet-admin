import { Component, Input, OnInit } from '@angular/core';
import { lastSixMonths } from 'app/functions/lastSixMonths';
import { HashState } from 'app/interface/dashboardHashState';
import { DepositState } from 'app/interface/depositStat';
import { GamedState } from 'app/interface/gameState';
import Chart from 'chart.js';

@Component({
  selector: 'app-circle-graph',
  templateUrl: './circle-graph.component.html',
  styleUrls: ['./circle-graph.component.css']
})
export class CircleGraphComponent implements OnInit {

  public canvas: any;
  public ctx;
  public chartHashes;
  lastSixMonth: any[] = [];
  @Input('hashes') hashes: HashState[];
  @Input('games') games: GamedState[];
  @Input('deposits') deposits: DepositState[];
  @Input('type') type: string;
  depositToShow: string = 'chartDepositAmount';
  gameToShow: string = 'chartGamesCount';
  hashesToShow: string = 'chartHashesHashes';
  constructor() { }

  ngOnInit(): void {
    this.lastSixMonth = lastSixMonths().lastSixMonth;
  }

  ngOnChanges() {
    if (this.type == 'game') {
      this.consctuctGameCircleState();
    }
    else if (this.type == 'hash') {
      this.consctuctHashCircleState(this.hashes, 'chartHashes');
    }
    else if (this.type == 'deposit') {
      this.consctuctDepositCircleState();
    }
  }


  private consctuctHashCircleState(hashes: HashState[], canvasId: string) {
    if (hashes) {
      let newHash = lastSixMonths().months;
      let monthDays = [];
      let monthsValue = { count: [0, 0, 0, 0, 0, 0], blocked: [0, 0, 0, 0, 0, 0], active: [0, 0, 0, 0, 0, 0], addresses: [0, 0, 0, 0, 0, 0] };
      hashes.map(hash => {
        for (let key in monthsValue) {
          monthsValue[key][newHash.indexOf(hash._id.month)] += hash[key];
        }
      })

      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let months = [];
      newHash.map((monthNumber, index) => {
        months.push(monthNames[monthNumber - 1]);
      })
      this.renderHashesCircleStat(monthsValue.count, months, 'chartHashesHashes');
      this.renderHashesCircleStat(monthsValue.addresses, months, 'chartHashesAddress');
      this.renderHashesCircleStat(monthsValue.blocked, months, 'chartHashesBlocked');
      this.renderHashesCircleStat(monthsValue.active, months, 'chartHashesActive');

    }

  }

  private consctuctGameCircleState() {
    if (this.games) {
      let newGame = lastSixMonths().months;
      let monthDays = [];
      let monthsValue = { count: [0, 0, 0, 0, 0, 0], win: [0, 0, 0, 0, 0, 0], lose: [0, 0, 0, 0, 0, 0], active: [0, 0, 0, 0, 0, 0], withdraw: [0, 0, 0, 0, 0, 0] };
      this.games.map(game => {
        for (let key in monthsValue) {
          monthsValue[key][newGame.indexOf(game._id.month)] += game[key];
        }
      })

      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let months = [];
      newGame.map((monthNumber, index) => {
        months.push(monthNames[monthNumber - 1]);
      })
      this.renderHashesCircleStat(monthsValue.count, months, 'chartGamesCount');
      this.renderHashesCircleStat(monthsValue.active, months, 'chartGamesActive');
      this.renderHashesCircleStat(monthsValue.win, months, 'chartGamesWin');
      this.renderHashesCircleStat(monthsValue.lose, months, 'chartGamesLose');
      this.renderHashesCircleStat(monthsValue.withdraw, months, 'chartGamesWithdraw');

    }

  }

  private consctuctDepositCircleState() {
    console.log('circle',this.deposits);
    if (this.deposits) {
      let newHash = lastSixMonths().months;
      let monthDays = [];
      let monthsValue = { amount: [0, 0, 0, 0, 0, 0], currentBalance: [0, 0, 0, 0, 0, 0] };
      this.deposits.map(deposit => {
        monthsValue.amount[newHash.indexOf(deposit._id.month)] += deposit.amounts / 100000000;
        monthsValue.currentBalance[newHash.indexOf(deposit._id.month)] += deposit.currentBalance / 100000000;
      })

      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let months = [];
      newHash.map((monthNumber, index) => {
        months.push(monthNames[monthNumber - 1]);
      })
      this.renderHashesCircleStat(monthsValue.amount, months, 'chartDepositAmount');
      this.renderHashesCircleStat(monthsValue.currentBalance, months, 'chartDepositCurrentBalance');
    }

  }





  renderHashesCircleStat(data: any[], labels: any[], canvasId: string) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.chartHashes = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          label: labels,
          pointRadius: 3,
          pointHoverRadius: 3,
          backgroundColor: [
            '#e3e3e3',
            '#4acccd',
            '#fcc468',
            '#ef8157',
            '#00B74A',
            '#262626'
          ],
          borderWidth: 0,
        }]
      },

      options: {

        legend: {
          display: false,
          position: 'top'
        },

        pieceLabel: {
          render: 'percentage',
          fontColor: ['white'],
          precision: 2
        },

        tooltips: {
          enabled: true
        },

        scales: {
          yAxes: [{

            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent"
            },
            ticks: {
              display: false,
            }
          }]
        },
      }
    });
  }

  changeHash(id:string) {
    this.hashesToShow = id;
  }

  changeDeposit(id: string) {
    this.depositToShow = id;
  }

  changeGame(id: string) {
    this.gameToShow = id;
  }


}
