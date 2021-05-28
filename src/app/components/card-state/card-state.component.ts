import { Component, Input, OnInit } from '@angular/core';
import { DepositStateCard } from 'app/interface/depositStateCard';
import { GameStateCard } from 'app/interface/gameStateCard';
import { HashStateCard } from 'app/interface/hashStateCard';
import { GameService } from 'app/services/game.service';
import { InteractionService } from 'app/services/interaction.service';

@Component({
  selector: 'app-card-state',
  templateUrl: './card-state.component.html',
  styleUrls: ['./card-state.component.css']
})
export class CardStateComponent implements OnInit {

  @Input('depositStateCard') depositStateCard: DepositStateCard = null;
  @Input('hashStateCard') hashStateCard: HashStateCard = null;
  @Input('gameStateCard') gameStateCard: GameStateCard = null;

  @Input('type') type:string;
  @Input('from') from:string;
  constructor(private gameService: GameService,
              private interactionService: InteractionService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.type == 'deposit' && this.from == 'dashboard') {
      this.getBalance();
    }
  }



  getBalance() {
    this.gameService.getTotalBalance()
      .then((result:any) => {
        if (result && result != false){
          console.log(result)
          if (this.depositStateCard) {
            this.depositStateCard.balance = result
          }
          else {
            this.depositStateCard = {balance:result,totalBalance:0,totalCurrentBalance:0,totalCurrentBalanceLastMonth:0};
            delete this.depositStateCard.totalBalance;
            delete this.depositStateCard.totalCurrentBalance;
            delete this.depositStateCard.totalCurrentBalanceLastMonth;
          }
        }
        else {
          this.interactionService.displayToaster('Something Went Wrong !','error','Balance Bitcoin');
        }
      })
      .catch((err) => {
        this.interactionService.displayToaster('Something Went Wrong !','error','Balance Bitcoin');
      })
  }


}
