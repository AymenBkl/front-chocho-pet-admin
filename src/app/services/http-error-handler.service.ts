import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  constructor() { }

  public handleError(error: HttpErrorResponse | any) {
    console.log(error);
    let errMsg: string;
    let errCode = 0;
    if (error.error && error.error instanceof ErrorEvent) {

    } else if (error.error && error.error.err && error.error.err.message === 'User validation failed: email: Email already exists' ){
      errMsg = `Email already exists`;
      errCode = 0;
    }
    else if (error.error && error.error.err && error.error.err.message === 'A user with the given username is already registered'){
      errMsg = `Username is already registered`;
      errCode = 1;
    }
    else if (error.error && error.error.err && error.error.err.message === 'Password or username is incorrect'){
      errMsg = `Password or username is incorrect`;
      errCode = 2;
    }
    else if (error && error.error == 'Too Many Requests'){
      errMsg = `To Many Request Try Again in 15 Mn`;
      errCode = 429;
    }
    else if (error.error && error.error.err === 'USER NOT FOUND'){
      errCode = 3;
      errMsg = 'USER NOT FOUND';
    }

    else if (error.error && error.error.err === 'Admin Not Found'){
      errCode = 103;
      errMsg = 'Admin Not Found';
    }
    else if (error.error && error.error.err === 'NO PRODUCTS FOUND'){
      errCode = 100;
      errMsg = 'NO PRODUCTS FOUND';
    }
    else if (error.error && error.error === 'Path not present'){
      errCode = 110;
      errMsg = 'PATH NOT PRESENT';
    }
    else if (error.error && error.error === 'Path dont exist'){
      errCode = 111;
      errMsg = 'PATH DONT EXISTS';
    }
    else if (error.error && error.error.err === 'Bad credentals'){
      errCode = 121;
      errMsg = 'Bad credentals Bool';
    }

    else {
      errCode = 10;
      errMsg = 'Something Went Wrong !';
    }
    return {errmsg : errMsg, errcode : errCode};
  }
}
