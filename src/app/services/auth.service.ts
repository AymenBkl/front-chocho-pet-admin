import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'app/interface/admin';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { AuthResponse } from '../interface/response';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Admin;
  isAuthenticated: boolean = false;
  updateAdminSub: Subscription;
  changePasswordSub: Subscription;
  loginSubscription: Subscription;
  postImageSub: Subscription;
  constructor(private httpClient: HttpClient,
    private storageService: StorageService,
    private httpErrorHandler: HttpErrorHandlerService) { }



  checkJWT(username: string) {
    return new Promise((resolve, reject) => {
      const token = this.storageService.getToken();
      if (token) {
        console.log(token);
        this.httpClient.get<AuthResponse>(environment.url + 'auth/checkJWT')
          .subscribe(response => {
            console.log(response);
            if (response.token === 'TOKEN VALID' && response.status === 200) {
              if (response.user.username == username) {
                this.setUserCredentials(response.user);
                resolve(true);
              }
              else {
                this.destroyUserCredentials();
                resolve(false);
              }
            }
            else {
              this.destroyUserCredentials();
              resolve(false);
            }
          }, err => {
            console.log(err);
            reject(err);
            this.destroyUserCredentials();
          });
      }
      else {
        resolve(false);
        this.destroyUserCredentials();
      }
    })
  }

  changePassword(oldPassword: string, newPassword: string) {
    return new Promise((resolve, reject) => {
      this.destroyChangePasswordSub();
      this.changePasswordSub = this.httpClient.post<AuthResponse>(environment.url + 'auth/changepassword', { oldPassword: oldPassword, newPassword: newPassword })
        .subscribe(response => {
          if (response && response.status == 200) {
            resolve(response.user);
          }
          else {
            resolve(false);
          }
        }, err => {
          reject(this.httpErrorHandler.handleError(err));
        });

    })
  }

  login(password: string, username: string) {
    return new Promise((resolve, reject) => {
      this.destroyLoginSub();
      this.loginSubscription = this.httpClient.post<AuthResponse>(environment.url + 'auth/login', { password: password, username: username })
        .subscribe(response => {
          console.log(response);
          if (response && response.status == 200) {
            this.storageService.saveToken(response.msg);
            this.setUserCredentials(response.user)
            resolve(response.user);
          }
          else {
            resolve(false);
          }
        }, err => {
          console.log(err);
          reject(this.httpErrorHandler.handleError(err));
        });

    })
  }


  updateAdmin(admin: string, updatedAdmin: Admin) {
    return new Promise((resolve, reject) => {
      this.destroyAdminSub();
      this.updateAdminSub = this.httpClient.post<AuthResponse>(environment.url + 'auth/updateadmin', { adminId: admin, updatedAdmin: updatedAdmin })
        .subscribe(response => {
          console.log(response);
          if (response && response.status == 200) {
            this.setUserCredentials(response.user)
            resolve(response.user);
          }
          else {
            resolve(false);
          }
        }, err => {
          console.log(err);
          reject(this.httpErrorHandler.handleError(err));
        });

    })
  }

  destroyAdminSub() {
    if (this.updateAdminSub) {
      this.updateAdminSub.unsubscribe();
    }
  }

  destroyLoginSub() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  destroyPostImageSub() {
    if (this.postImageSub) {
      this.postImageSub.unsubscribe();
    }
  }

  destroyChangePasswordSub() {
    if (this.changePasswordSub) {
      this.changePasswordSub.unsubscribe();
    }
  }

  postImage(formData: FormData) {
    return new Promise((resolve, reject) => {
      this.destroyPostImageSub();
      this.postImageSub = this.httpClient.post<AuthResponse>(environment.url + 'auth/postimage', formData)
        .subscribe(response => {
          console.log(response);
          if (response.status === 200) {
            this.setUserCredentials(response.user)
            resolve(response.user);
          }
          else {
            resolve(false);
          }
        }, err => {
          console.log(err);
          reject(this.httpErrorHandler.handleError(err));
        });
    });
  }

  setUserCredentials(user: Admin) {
    this.isAuthenticated = user.role === 'admin';
    this.user = user;
    this.storageService.saveAdmin(user);
  }

  destroyUserCredentials() {
    this.isAuthenticated = false;
    this.user = null;
    this.storageService.removeToken();
  }
}
