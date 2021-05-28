import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/interface/product';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { ProductResponse} from '../interface/productResponse'
import { HttpErrorHandlerService } from './http-error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productSub: Subscription;
  updateProductSub: Subscription;
  postImageSub: Subscription;
  products: Product[];
  constructor(private httpClient: HttpClient,
              private httpErrorHandlerService: HttpErrorHandlerService) {
              }

  getProducts() {
    console.log("here");
    return new Promise((resolve,reject) => {
      this.onDestroy()
      this.productSub = this.httpClient.get<ProductResponse>(environment.url + 'product/products')
      .subscribe(productResponse => {
        if (productResponse .status == 200 && productResponse .success){
          this.products = productResponse.products;
          resolve(productResponse.products );
        }
        else if (productResponse .status == 404 && !productResponse .success){
          reject(this.httpErrorHandlerService.handleError(productResponse));
        }
      },err => {
        reject(this.httpErrorHandlerService.handleError(err));
      })
    })
  }

  updateProductLink(productEan:string,newLink:string) {
    return new Promise((resolve,reject) => {
      this.onDestroyUpdate()
      this.updateProductSub = this.httpClient.put<ProductResponse>(environment.url + 'product/updatelink',{newLink: newLink,ean:productEan})
      .subscribe(productResponse => {
        console.log(productResponse);
        if (productResponse .status == 200 && productResponse .success){
          resolve(productResponse);
        }
        else if (productResponse .status == 404 && !productResponse .success){
          reject(false);
        }
      },err => {
        reject(this.httpErrorHandlerService.handleError(err));
      })
    })
  }

  postImage(formData: FormData) {
    return new Promise((resolve, reject) => {
      this.destroyPostImageSub();
      this.postImageSub = this.httpClient.post<ProductResponse>(environment.url + 'product/postimage', formData)
        .subscribe(response => {
          console.log(response);
          if (response.status === 200) {
            resolve(response);
          }
          else {
            resolve(false);
          }
        }, err => {
          console.log(err);
          reject(this.httpErrorHandlerService.handleError(err));
        });
    });
  }

  getProduct(productEan: string) {
    return new Promise(async (resolve,reject) => {
      if (!this.products || (this.products && this.products.length == 0)){
        const product = await this.getProducts();
        console.log(this.products);
        resolve(this.products.filter(product => product.productEan == productEan ));
      }
      else {
        resolve(this.products.filter(product => product.productEan == productEan ));
      }
    })
  }



  onDestroy() {
    if (this.productSub){
      this.productSub.unsubscribe();
    }
  }

  onDestroyUpdate(){
    if (this.updateProductSub){
      this.productSub.unsubscribe();
    }
  }

  destroyPostImageSub() {
    if (this.postImageSub) {
      this.postImageSub.unsubscribe();
    }
  }
}
