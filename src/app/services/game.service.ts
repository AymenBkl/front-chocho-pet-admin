import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashBoardDepositStateResponse } from 'app/interface/dashboardDepositStateResponse';
import { DashBoardGameStateResponse } from 'app/interface/dashboardGameStateResponse';
import { StateResponse } from 'app/interface/hashStatResponse';
import { WithdrawResponse } from 'app/interface/withDrawResponse';
import { environment } from 'environments/environment';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient,
              private httppErrorHandler: HttpErrorHandlerService) { }


  getGameStat() {
    return new Promise((resolve,reject) => {
      this.httpClient.get<DashBoardGameStateResponse>(environment.url + 'game/gamedashboard')
      .subscribe(hashStateResponse => {
        console.log(hashStateResponse);
        if (hashStateResponse.status == 200 && hashStateResponse.success){
          resolve(hashStateResponse.gameStates);
        }
        else if (hashStateResponse.status == 404 && !hashStateResponse.success){
          resolve(this.httppErrorHandler.handleError(hashStateResponse.err));
        }
      },err => {
        reject(this.httppErrorHandler.handleError(err));
      })
    })
  }

  getGameStatHash(hashId:string) {
    return new Promise((resolve,reject) => {
      this.httpClient.get<DashBoardGameStateResponse>(environment.url + 'game/gamehashstate/' + hashId)
      .subscribe(hashStateResponse => {
        console.log(hashStateResponse);
        if (hashStateResponse.status == 200 && hashStateResponse.success){
          resolve(hashStateResponse.gameStates);
        }
        else if (hashStateResponse.status == 404 && !hashStateResponse.success){
          resolve(this.httppErrorHandler.handleError(hashStateResponse.err));
        }
      },err => {
        reject(this.httppErrorHandler.handleError(err));
      })
    })
  }

  getDepositStat() {
    return new Promise((resolve,reject) => {
      this.httpClient.get<DashBoardDepositStateResponse>(environment.url + 'game/depositdashboard')
      .subscribe(depositStateResponse => {
        console.log(depositStateResponse);
        if (depositStateResponse.status == 200 && depositStateResponse.success){
          resolve(depositStateResponse.depositStates);
        }
        else if (depositStateResponse.status == 404 && !depositStateResponse.success){
          resolve(this.httppErrorHandler.handleError(depositStateResponse.err));
        }
      },err => {
        reject(this.httppErrorHandler.handleError(err));
      })
    })
  }

  getDepositStatHash(addressId: string) {
    return new Promise((resolve,reject) => {
      this.httpClient.get<DashBoardDepositStateResponse>(environment.url + 'game/deposithashstate/' + addressId)
      .subscribe(depositStateResponse => {
        console.log(depositStateResponse);
        if (depositStateResponse.status == 200 && depositStateResponse.success){
          resolve(depositStateResponse.depositStates);
        }
        else if (depositStateResponse.status == 404 && !depositStateResponse.success){
          resolve(this.httppErrorHandler.handleError(depositStateResponse.err));
        }
      },err => {
        reject(this.httppErrorHandler.handleError(err));
      })
    })
  }

  getWithdraws() {
    return new Promise((resolve,reject) => {
      this.httpClient.get<WithdrawResponse>(environment.url + 'game/withdraws')
      .subscribe(withdrawsResponse => {
        if (withdrawsResponse.status == 200 && withdrawsResponse.success){
          resolve(withdrawsResponse.withdraws);
        }
        else if (withdrawsResponse.status == 404 || !withdrawsResponse.success){
          resolve({status:'NOT FOUND'});
        }
        else {
          resolve(false);
        }
      },err => {
        reject(err);
      })
    })
  }

  getTotalBalance() {
    return new Promise((resolve,reject) => {
      this.httpClient.get<any>(environment.url + 'bitcoin/getbalance')
      .subscribe(balanceResponse => {
        console.log(balanceResponse);
        if (balanceResponse.status == 200 && balanceResponse.success && balanceResponse.body && balanceResponse.body.result){
          resolve(balanceResponse.body.result);
        }
        else if (balanceResponse.status == 404 && !balanceResponse.success){
          resolve(false);
        }
      },err => {
        reject(err);
      })
    })
  }
}
