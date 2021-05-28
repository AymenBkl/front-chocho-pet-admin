import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailResponse } from 'app/interface/emailResponse';
import { environment } from 'environments/environment';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  constructor(private httpClient: HttpClient,
    private httpErrors: HttpErrorHandlerService) { }


  getEmails() {
    return new Promise((resolve,reject) => {
      this.httpClient.get<EmailResponse>(environment.url + 'emails/getemails')
      .subscribe(emailResponse => {
        if (emailResponse.status == 200 && emailResponse.success){
          resolve(emailResponse.object);
        }
        else if (emailResponse.status == 404 && !emailResponse.success){
          resolve({status:'NOT FOUND'});
        }
        else {
          resolve(false);
        }
      },err => {
        reject(this.httpErrors.handleError(err));
      })
    })
  }
}
