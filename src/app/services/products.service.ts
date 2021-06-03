import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Badge } from 'app/interface/badge';
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
  badges: Badge[];
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

  getBadges() {
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(environment.url + 'products/getbadges')
        .subscribe(badgesResponse => {
          if (badgesResponse.status == 200 && badgesResponse.success) {
            this.badges = badgesResponse.badges;
            console.log(badgesResponse)
            resolve(badgesResponse.badges);
          }
          else if (badgesResponse.status == 404 && !badgesResponse.success) {
            resolve({status:'not found'});
          }
          else {
            resolve(false);
          }
        }, err => {
          reject(err);
        })
    })
  }

  getProduct(productId) {
    return new Promise((resolve, reject) => {
      this.httpClient.get<ProductResponse>(environment.url + 'products/getproduct/' + productId)
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

  saveBadge(badgeBody:Badge) {
    return new Promise((resolve, reject) => {
      this.httpClient.post<ProductResponse>(environment.url + 'products/savebadge',{badgeBody:badgeBody})
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

  getMainBadges() {
    return new Promise(resolve => {
      if (this.badges && this.badges.length > 0){
        resolve(this.badges);
      }
      else {
        resolve(this.getBadges());
      }

    })
  }
}
