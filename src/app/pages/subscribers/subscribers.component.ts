import { Component, OnInit } from '@angular/core';
import { EmailsService } from 'app/services/emails.service';
import { InteractionService } from 'app/services/interaction.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  constructor(private emailService: EmailsService,
              private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.getEmails();
  }

  getEmails() {
    this.interactionService.createLoading("Loading Emails Please Wait !!");
    this.emailService.getEmails()
      .then((emails) => {
        this.interactionService.closeToast();
        console.log(emails);
        if (emails && emails != false){
          this.interactionService.displayToast('Emails Loaded Succesfully', false, 'success');
        }
        else {
          this.interactionService.displayToast('Something Went Wrong !', false, 'error');
        }
      })
      .catch(err => {
        this.interactionService.displayToast('Something Went Wrong !', false, 'error');
        this.interactionService.closeToast();

      })
  }

}
