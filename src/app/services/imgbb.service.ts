import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImgbbService {

  constructor(private httpClient: HttpClient) { }

  uploadImage(file: File){
    const formData = new FormData();
    console.log(file);
    formData.append('image',file);
    return new Promise((resolve,reject) => {
      this.httpClient.post('https://api.imgbb.com/1/upload',formData,{params:{key:'61716e53b9270cab4bf281cab04a89db'}})
        .subscribe((data) => {
          resolve(data['data']['url']);
        },err => {
          reject(err);
        })

    })
  }
}
