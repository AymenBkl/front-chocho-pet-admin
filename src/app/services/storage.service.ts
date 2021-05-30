import { Injectable } from '@angular/core';
import { Admin } from 'app/interface/admin';
import { Product } from 'app/interface/product';

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

  saveProduct(product: Product) {
    localStorage.setItem(product.productId,JSON.stringify(product));
  }

  getProduct(key:string) {
    const product = localStorage.getItem(key);
    if (product && product != null){
      return JSON.parse(product);
    }
    else {
      return null;
    }
  }
}
