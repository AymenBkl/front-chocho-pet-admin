import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'app/interface/order';
import { OrderBolResponse } from 'app/interface/orderBolResponse';
import { Product } from 'app/interface/product';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orderSub: Subscription;
  callBotSub: Subscription;
  constructor(private httpClient: HttpClient,
              private HttpErrorHandlerService: HttpErrorHandlerService) { }

  getOrders(page:number) {
    return new Promise((resolve,reject) => {
      this.onDestroy();
      this.orderSub = this.httpClient.get<OrderBolResponse>(environment.url + 'bol/orders?fulfilment-method=FBR&status=ALL&page=' + page)
      .subscribe(orderBolResponse => {
        console.log(orderBolResponse);
        if (orderBolResponse .status == 200 && orderBolResponse .success){
          resolve(orderBolResponse.body);
        }
        else if (orderBolResponse .status == 404 && !orderBolResponse .success){
          resolve(false);
        }
      },err => {
        reject(this.HttpErrorHandlerService.handleError(err));
      })
    })
  }

  callBot(order: Order,product) {
    return new Promise((resolve,reject) => {
      this.destroyBotSub();
      this.callBotSub = this.httpClient.post<OrderBolResponse>(environment.url + 'bol/callbot',{order:order,product:product})
      .subscribe(orderBolResponse => {
        if (orderBolResponse .status == 200 && orderBolResponse .success){
          resolve(true);
        }
        else if (orderBolResponse .status == 404 && !orderBolResponse .success){
          resolve(false);
        }
      },err => {
        reject(err);
      })
    })
  }


  onDestroy() {
    if (this.orderSub){
      this.orderSub.unsubscribe();
    }
  }

  destroyBotSub(){
    if (this.callBotSub){
      this.callBotSub.unsubscribe();
    }
  }
}
