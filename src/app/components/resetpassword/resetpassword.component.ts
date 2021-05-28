import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { InteractionService } from '../../services/interaction.service';
import { onValueChanged } from './valueChange';
import { MustMatch } from './must-matchValdiator';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit,OnDestroy {

  resetPasswordForm: FormGroup;
  formErrors: any;
  submitted = false;
  validationErrors: {errmsg , errcode};
  hide = true;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private interactionService: InteractionService,
              private router: Router) { }
  ngOnDestroy(): void {
    this.interactionService.closeToast();
    this.authService.destroyChangePasswordSub();
  }

  ngOnInit(): void {
    this.buildResetPasswordForm();
  }

  buildResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      oldPassword : [{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(6)]],
      newPassword : [{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(6)]],
      confirmNewPassword : [{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(6)]],
    },
    {
      validators : MustMatch('newPassword', 'confirmNewPassword')
    });
    this.resetPasswordForm.valueChanges
      .subscribe(user => {
        this.formErrors = onValueChanged(user, this.resetPasswordForm);
        console.log(this.formErrors);
      });
  }

  changePassword() {
    this.submitted = true;
    this.interactionService.createLoading('Changin Password');
    this.authService.changePassword(this.resetPasswordForm.value.oldPassword,this.resetPasswordForm.value.newPassword)
      .then((result: any) => {
        this.interactionService.closeToast();
        this.submitted = false;
        if (result && result != false){
          this.interactionService.alertMsg('ERROR','Password Changed Succesfully','success');
        }
        else {
          this.interactionService.alertMsg('ERROR','Something Went Wrong !','error');
        }
      })
      .catch(err => {
        this.interactionService.closeToast();
        this.submitted = false;
        this.validationErrors = err;
        console.log(err);
        this.interactionService.alertMsg('ERROR',err.errmsg,'error');

      })
  }





}
