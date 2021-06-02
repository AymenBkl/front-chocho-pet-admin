import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private httpClient: HttpClient) { }


  saveBestReviews(reviewBody) {
    return new Promise((resolve, reject) => {
      this.httpClient.post<any>(environment.url + 'tools/savereview',{reviewBody:reviewBody})
        .subscribe(result => {
          if (result.status == 200 && result.success) {
            resolve(true);
          }
          else if (result.status == 404 && !result.success) {
            resolve(false);
          }
        }, err => {
          reject(err);
        })
    })

  }

  getBestReviews() {
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(environment.url + 'tools/getbestreviews')
        .subscribe(result => {
          if (result.status == 200 && result.success) {
            resolve(result.object);
          }
          else if (result.status == 404 && !result.success) {
            resolve(false);
          }
        }, err => {
          reject(err);
        })
    })

  }
}
