import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackupandrestoreService {

  constructor(private httpClient: HttpClient) { }


  getFiles() {
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(environment.url + 'drive/drivefile')
        .subscribe(driveResponse => {
          console.log(driveResponse)
          resolve(driveResponse);
        }, err => {
          reject(err);
        })
    })
  }

  restoreDataBase(fileId:string,fileName:string) {
    return new Promise((resolve, reject) => {
      this.httpClient.post<any>(environment.url + 'drive/restoredatabase',{fileId:fileId,fileName:fileName})
        .subscribe(driveResponse => {
          console.log(driveResponse)
          resolve(driveResponse);
        }, err => {
          reject(err);
        })
    })
  }
}
