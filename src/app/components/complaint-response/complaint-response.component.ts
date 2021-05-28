import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HashService } from 'app/services/hash.service';
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
    private hashService: HashService) { }

  ngOnInit(): void {
    this.buildresponseCompliantForm();
  }

  buildresponseCompliantForm() {
    let note = this.data.complaint.response ? this.data.complaint.response.note : '';
    this.responseCompliantForm = this.formBuilder.group({
      status : [{value:this.data.complaint.type,disabled:this.submitted}, [Validators.required]],
      note : [{value:note,disabled:this.submitted}, [Validators.required]],
      solve : [{value:true,disabled:this.submitted}, [Validators.required]],
    });
  }


  submitResponse() {
    this.submitted = true;
    this.interactionService.displayToast('Submiting Response',true,'info');
    this.hashService.updateComplaint(this.data,this.responseCompliantForm.value)
      .then((result:any) => {
        console.log(result);
        this.submitted = false;
        this.interactionService.closeToast();
        if (result && result != false) {
          this.interactionService.displayToast('Response submitted Succesfully',false,'success');
          this.dialogRef.close(result);
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
