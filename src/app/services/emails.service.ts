import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactResponse } from 'app/interface/ContactResponse';
import { EmailResponse } from 'app/interface/emailResponse';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  emailsSubscription: Subscription;
  contactsSubscription: Subscription;
  constructor(private httpClient: HttpClient,
    private httpErrors: HttpErrorHandlerService) { }


  getEmails() {
    return new Promise((resolve,reject) => {
      this.onDestroyEmails();
      this.emailsSubscription = this.httpClient.get<EmailResponse>(environment.url + 'emails/getemails')
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

  getContacts() {
    return new Promise((resolve,reject) => {
      this.onDestroyContacts();
      this.contactsSubscription = this.httpClient.get<ContactResponse>(environment.url + 'emails/getcontacts')
      .subscribe(contactResponse => {
        if (contactResponse.status == 200 && contactResponse.success){
          resolve(contactResponse.object);
        }
        else if (contactResponse.status == 404 && !contactResponse.success){
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

  onDestroyEmails() {
    if (this.emailsSubscription){
      this.emailsSubscription.unsubscribe();
    }
  }

  onDestroyContacts() {
    if (this.contactsSubscription){
      this.contactsSubscription.unsubscribe();
    }
  }
}
