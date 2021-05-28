import { Component, OnDestroy, OnInit } from '@angular/core';
import { HashState } from 'app/interface/dashboardHashState';
import { DepositState } from 'app/interface/depositStat';
import { DepositStateCard } from 'app/interface/depositStateCard';
import { GamedState } from 'app/interface/gameState';
import { GameStateCard } from 'app/interface/gameStateCard';
import { HashStateCard } from 'app/interface/hashStateCard';
import { GameService } from 'app/services/game.service';
import { HashService } from 'app/services/hash.service';
import { InteractionService } from 'app/services/interaction.service';


@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html',
  styleUrls:['./dashboard.component.css']
})

export class DashboardComponent implements OnInit,OnDestroy {


  public chartColor;
  public chartHours;
  hashes: HashState[];
  games: GamedState[];
  deposits: DepositState[];
  depositStateCard: DepositStateCard = null;
  hashStateCard: HashStateCard = null;
  gameStateCard: GameStateCard = null;
  constructor(private hashService: HashService,
              private gameService: GameService,
              private interactionService: InteractionService) {

  }
  ngOnDestroy(): void {
    this.interactionService.clearAllToastr();
  }
  ngOnInit() {
    this.getHashes();
    this.getGames();
    this.getDeposits();
    /**this.chartColor = "#FFFFFF";

    this.canvas = document.getElementById("chartHours");
    this.ctx = this.canvas.getContext("2d");

    this.chartHours = new Chart(this.ctx, {
      type: 'line',

      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        datasets: [{
          borderColor: "#6bd098",
          backgroundColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
        },
        {
          borderColor: "#f17e5d",
          backgroundColor: "#f17e5d",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
        },
        {
          borderColor: "#fcc468",
          backgroundColor: "#fcc468",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
        }
        ]
      },
      options: {
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              //padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f"
            }
          }]
        },
      }
    });**/





  }


  getHashes() {
    const toastId = this.interactionService.displayToaster('Loading Hashes State','loading','Loading');
    this.hashService.getHashStat()
      .then((hashes: any) => {
        this.interactionService.closeToaster(toastId);
        console.log(hashes);
        if (hashes && hashes.length > 0) {
          this.interactionService.displayToaster('Hashes State Loaded Successfully','success','Success');
          this.hashes = hashes;
        }
        else if (hashes && hashes.length == 0) {
          this.interactionService.displayToaster('Their is no hashes','warning','Warning');
        }
        else {
          this.interactionService.displayToaster(hashes.errmsg,'error','Error');
        }
      })
      .catch((err) => {
        this.interactionService.closeToaster(toastId);
        this.interactionService.displayToaster(err.errmsg,'error','Error');
      })
  }

  getGames() {
    const toastId = this.interactionService.displayToaster('Loading Games State','loading','Loading');
    this.gameService.getGameStat()
      .then((games: any) => {
        this.interactionService.closeToaster(toastId);
        if (games && games.length > 0) {
          this.interactionService.displayToaster('Games State Loaded Successfully','success','Success');
          this.games = games;
        }
        else if (games && games.length == 0) {
          this.interactionService.displayToaster('Their is no games','warning','Warning');
        }
        else {
          this.interactionService.displayToaster(games.errmsg,'error','Error');

        }
      })
      .catch((err) => {
        this.interactionService.closeToaster(toastId);
        this.interactionService.displayToaster(err.errmsg,'error','Error');

      })
  }

  getDeposits() {
    const toastId = this.interactionService.displayToaster('Loading Deposits State','loading','Loading');
    this.gameService.getDepositStat()
      .then((deposits: any) => {
        this.interactionService.closeToaster(toastId);
        if (deposits && deposits.length > 0) {
          this.deposits = deposits;
          this.interactionService.displayToaster('Deposit State Loaded Successfully','success','Deposits State');

        }
        else if (deposits && deposits.length == 0) {
          this.interactionService.displayToaster('Their is no deposits','warning','Warning');
        }
        else {
          this.interactionService.displayToaster(deposits.errmsg,'error','Error');
        }
      })
      .catch((err) => {
        this.interactionService.closeToaster(toastId);
        this.interactionService.displayToaster(err.errmsg,'error','Error');
      })
  }



getDepositStateCard(event) {
  setTimeout(() => {
    this.depositStateCard = event;

  },10000);
}

getHashStateCard(event) {
  console.log(event);
  setTimeout(() => {
    this.hashStateCard = event;

  },1000);
}

getGameStateCard(event) {
  console.log(event);
  setTimeout(() => {
    this.gameStateCard = event;

  },1000);
}









}
