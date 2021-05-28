import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { InteractionService } from '../../services/interaction.service';
import { onValueChanged } from './valueChanges';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  formErrors: any;
  submitted = false;
  validationErrors: {errmsg , errcode};
  hide = true;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private interactionService: InteractionService,
              private router: Router) { }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      username : [{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password : [{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(6)]],
    });
    this.loginForm.valueChanges
      .subscribe(user => {
        this.formErrors = onValueChanged(user, this.loginForm);
        console.log(this.formErrors);
      });
  }

  login() {
    this.submitted = true;
    this.authService.login(this.loginForm.value.password,this.loginForm.value.username)
      .then((result: any) => {
        this.submitted = false;
        if (result && result != false){
          this.goToDashboard();
        }
        else {
          this.showSnackBar('Something Went Wrong !','ERROR');
        }
      })
      .catch(err => {
        this.submitted = false;
        this.validationErrors = err;
        console.log(err);
        this.showSnackBar(err.errmsg + ' !','ERROR');
      })
  }

  goToDashboard(){
    //this.interactionService.createLoading('please wait ! ...');
    this.showSnackBar('WELCOM','SUCCESS');
    this.router.navigate(['dashboard']);
  }

  showSnackBar(msg,type = '') {
    this.interactionService.openSnackBar(msg,'bottom','center',type);
  }


}
