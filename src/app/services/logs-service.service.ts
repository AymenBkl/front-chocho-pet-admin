import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogResponse } from 'app/interface/logResponse';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LogsServiceService {
  logSub: Subscription;
  constructor(private httpClient:HttpClient,
              private httpErrorHandlerService: HttpErrorHandlerService) { }

  getLog(path:string){
    return new Promise((resolve,reject) => {
      this.onDestroy();
      console.log(path);
      this.logSub= this.httpClient.get<LogResponse>(environment.url + 'logs/logs/' + path)
      .subscribe(logResponse => {
        console.log(logResponse);
        if (logResponse.success == 200){
          resolve(logResponse.file );
        }
        else if (logResponse.success != 200){
          reject(this.httpErrorHandlerService.handleError(logResponse))
        }
      },err => {
        console.log(err);
        reject(this.httpErrorHandlerService.handleError(err))
      })
    })
  }

  onDestroy() {
    if (this.logSub){
      this.logSub.unsubscribe();
    }
  }
}
