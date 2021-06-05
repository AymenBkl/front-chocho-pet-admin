import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailsService } from 'app/services/emails.service';
import { InteractionService } from 'app/services/interaction.service';

@Component({
  selector: 'app-complaint-response',
  templateUrl: './complaint-response.component.html',
  styleUrls: ['./complaint-response.component.css']
})
export class ComplaintResponseComponent implements OnInit {

  responseCompliantForm: FormGroup;
  formErrors: any;
  submitted = false;
  validationErrors: {errmsg , errcode};
  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ComplaintResponseComponent>,
    private interactionService: InteractionService,
    private emailService: EmailsService) { }

  ngOnInit(): void {
    this.buildresponseCompliantForm();
  }

  buildresponseCompliantForm() {
    console.log(this.data.contact);
    this.responseCompliantForm = this.formBuilder.group({
      subject : [{value:this.data.contact.subject,disabled:this.submitted}, [Validators.required]],
      message : [{value:'',disabled:this.submitted}, [Validators.required]],
    });
  }


  submitResponse() {
    this.submitted = true;
    this.interactionService.displayToast('Submiting Response',true,'info');
    this.emailService.submitResponse(this.data.contact._id,this.responseCompliantForm.value.message,this.responseCompliantForm.value.subject,this.data.contact.email)
      .then((result:any) => {
        console.log(result);
        this.submitted = false;
        this.interactionService.closeToast();
        if (result && result != false) {
          this.interactionService.displayToast('Response submitted Succesfully',false,'success');
          this.dialogRef.close(true);
        }
        else {
          this.interactionService.displayToast('Error While Submiting Response',false,'warning');
        }
      })
      .catch(err => {
        this.submitted = false;
        console.log(err);
        this.interactionService.displayToast(err.errmsg,false,'error');
      })
  }

}
