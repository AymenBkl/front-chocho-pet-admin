import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/interface/product';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { ProductResponse } from '../interface/productResponse'
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
    return new Promise((resolve, reject) => {
      this.onDestroy()
      this.productSub = this.httpClient.get<ProductResponse>(environment.url + 'products/getproducts')
        .subscribe(productResponse => {
          if (productResponse.status == 200 && productResponse.success) {
            this.products = productResponse.products;
            resolve(productResponse.products);
          }
          else if (productResponse.status == 404 && !productResponse.success) {
            reject(this.httpErrorHandlerService.handleError(productResponse));
          }
        }, err => {
          reject(this.httpErrorHandlerService.handleError(err));
        })
    })
  }

  updateProductLink(productId: string, newBadge: string) {
    return new Promise((resolve, reject) => {
      this.onDestroyUpdate()
      this.updateProductSub = this.httpClient.put<ProductResponse>(environment.url + 'products/updateproduct', { newBadge: newBadge, id: productId })
        .subscribe(productResponse => {
          console.log(productResponse);
          if (productResponse.status == 200 && productResponse.success) {
            resolve(productResponse);
          }
          else if (productResponse.status == 404 && !productResponse.success) {
            reject(false);
          }
        }, err => {
          reject(this.httpErrorHandlerService.handleError(err));
        })
    })
  }

  postImage(formData: FormData) {
    return new Promise((resolve, reject) => {
      this.destroyPostImageSub();
      this.postImageSub = this.httpClient.post<ProductResponse>(environment.url + 'products/postimage', formData)
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

  refreshProducts() {
    return new Promise((resolve, reject) => {
      this.httpClient.get<ProductResponse>(environment.url + 'products/refreshProducts')
        .subscribe(productResponse => {
          if (productResponse.status == 200 && productResponse.success) {
            resolve(true);
          }
          else if (productResponse.status == 404 && !productResponse.success) {
            reject(this.httpErrorHandlerService.handleError(productResponse));
          }
        }, err => {
          console.log(err);
          reject(this.httpErrorHandlerService.handleError(err));
        })
    })
  }

  getProduct(productId: string) {
    return new Promise(async (resolve, reject) => {
      if (!this.products || (this.products && this.products.length == 0)) {
        const product = await this.getProducts();
        console.log(this.products);
        resolve(this.products.filter(product => product.productId == productId));
      }
      else {
        resolve(this.products.filter(product => product.productId == productId));
      }
    })
  }

  saveDescription(description:any,productId:string,productMainId:string) {
    return new Promise((resolve, reject) => {
      this.httpClient.post<ProductResponse>(environment.url + 'products/adddescription',{description:description,productId:productId,productMainId:productMainId})
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

  saveProductDescriptionTable(dataToSave:any,productId:string) {
    return new Promise((resolve, reject) => {
      this.httpClient.put<ProductResponse>(environment.url + 'products/updateproducttabledescription',{dataToSave:dataToSave,productId:productId})
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



  onDestroy() {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
  }

  onDestroyUpdate() {
    if (this.updateProductSub) {
      this.productSub.unsubscribe();
    }
  }

  destroyPostImageSub() {
    if (this.postImageSub) {
      this.postImageSub.unsubscribe();
    }
  }
}
