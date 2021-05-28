import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthService } from './auth.service';
import { HashesResponseApi } from 'app/interface/hashesResponseApi';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { HashInfoResponse } from 'app/interface/hashInfoResponse';
import { StateResponse } from 'app/interface/hashStatResponse';
import { ComplaintResponse } from 'app/interface/complaintResponse';
import { Complaint } from 'app/interface/complaint';
@Injectable({
  providedIn: 'root'
})
export class HashService {
  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private httppErrorHandler: HttpErrorHandlerService) { }

  checkHash(hashId: string) {
    return new Promise((resolve,reject) => {
      this.httpClient.get<HashInfoResponse>(environment.url + 'hash/checkHash?hashId=' + hashId)
      .subscribe(hashResponse => {
        if (hashResponse.status == 200 && hashResponse.success){
          resolve(hashResponse.hash);
        }
        else if (hashResponse.status == 404 && !hashResponse.success){
          resolve(false);
        }
      },err => {
        reject(err);
      })
    })
  }

  getHashes(){
    return new Promise((resolve,reject) => {
      this.httpClient.get<HashesResponseApi>(environment.url + 'hash/gethashes')
      .subscribe(hashResponse => {
        if (hashResponse.status == 200 && hashResponse.success){
          resolve(hashResponse.hashes);
        }
        else if (hashResponse.status == 404 && !hashResponse.success){
          resolve(false);
        }
      },err => {
        reject(err);
      })
    })
  }

  updateHashStatus(hashId:string,status:string) {
    return new Promise((resolve,reject) => {
      this.httpClient.put<any>(environment.url + 'hash/updatehash',{hashId: hashId,status: status})
      .subscribe(hashResponse => {
        if (hashResponse.status == 200 && hashResponse.success){
          resolve(hashResponse.hash);
        }
        else if (hashResponse.status == 404 && !hashResponse.success){
          resolve(false);
        }
      },err => {
        reject(this.httppErrorHandler.handleError(err));
      })
    })
  }


  getHashStat() {
    return new Promise((resolve,reject) => {
      this.httpClient.get<StateResponse>(environment.url + 'hash/hashdashboard')
      .subscribe(hashStateResponse => {
        if (hashStateResponse.status == 200 && hashStateResponse.success){
          resolve(hashStateResponse.hashStates);
        }
        else if (hashStateResponse.status == 404 && !hashStateResponse.success){
          resolve(this.httppErrorHandler.handleError(hashStateResponse.err));
        }
      },err => {
        reject(this.httppErrorHandler.handleError(err));
      })
    })
  }


  complaints() {
    return new Promise((resolve,reject) => {
      this.httpClient.get<ComplaintResponse>(environment.url + 'hash/complaints')
      .subscribe(complaintResponse => {
        if (complaintResponse.status == 200 && complaintResponse.success){
          resolve(complaintResponse.complaints);
        }
        else if (complaintResponse.status == 404 && !complaintResponse.success){
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


  updateComplaint(complaint:Complaint,response:any) {
    return new Promise((resolve,reject) => {
      this.httpClient.put<ComplaintResponse>(environment.url + 'hash/updatecomplaint',{complaint: complaint,response: response})
      .subscribe(complaintResponse  => {
        console.log(complaintResponse);
        if (complaintResponse.status == 200 && complaintResponse.success){
          console.log("here",complaintResponse.complaints);
          resolve(complaintResponse.complaints);
        }
        else if (complaintResponse.status == 404 && !complaintResponse.success){
          resolve(false);
        }
        else {
          reject(this.httppErrorHandler.handleError(complaintResponse))
        }
      },err => {
        reject(this.httppErrorHandler.handleError(err));
      })
    })
  }



}
