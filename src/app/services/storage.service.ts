import { Injectable } from '@angular/core';
import { Admin } from 'app/interface/admin';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveToken(token: string){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  removeToken(){
    localStorage.removeItem('token');
    this.removeAdmin();
  }

  saveAdmin(admin: Admin){
    localStorage.setItem('admin',JSON.stringify(admin));
  }

  removeAdmin(){
    localStorage.removeItem('admin');
  }

  getAdmin(): Admin{
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (admin) {
      return admin;
    }
    else {
      return null;
    }
  }
}
