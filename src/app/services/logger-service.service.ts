import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerServiceService {

  constructor(private httpClient: HttpClient) { }

  getLogs(path:string,level:string) {
    return new Promise((resolve,reject) => {
      this.httpClient.get(environment.url + 'logger/'  + path + '?level=' + level)
        .subscribe((data:any) => {
          resolve(data);
        },err => {
          reject(err);
        })

    })
  }
}
