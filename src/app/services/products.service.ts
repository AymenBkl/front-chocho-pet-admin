import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Badge } from 'app/interface/badge';
import { Product } from 'app/interface/product';
import { ShipingBadge } from 'app/interface/shipingBadge';
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
  badges: Badge[] = [];
  shipingBadges: ShipingBadge[] = [];
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

  getURLS() {
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(environment.url + 'products/producturls')
        .subscribe(productResponse => {
          if (productResponse.status == 200 && productResponse.success) {
            resolve(productResponse.products);
          }
          else if (productResponse.status == 404 && !productResponse.success) {
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

  getBadgesShiping() {
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(environment.url + 'products/getbadgesshiping')
        .subscribe(badgesResponse => {
          if (badgesResponse.status == 200 && badgesResponse.success) {
            this.shipingBadges = badgesResponse.badges;
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

  updateProductLink(productId: string, badgeId: string,type:string) {
    return new Promise((resolve, reject) => {
      this.onDestroyUpdate()
      this.updateProductSub = this.httpClient.put<ProductResponse>(environment.url + 'products/updateproduct?type=' + type, { badgeId: badgeId, id: productId })
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
        .subscribe((response:any) => {
          console.log(response);
          if (response.status === 200) {
            this.addBadge(response.badge);
            resolve(response);
          }
          else if (response.status && response.msg == 'Name Already Exists'){
            resolve({duplicateName:true});
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

  saveBadgeShiping(badgeBody:Badge) {
    return new Promise((resolve, reject) => {
      this.httpClient.post<ProductResponse>(environment.url + 'products/savebadgeshiping',{badgeBody:badgeBody})
        .subscribe((response:any) => {
          console.log(response);
          if (response.status === 200) {
            this.addShipingBadge(response.badge);
            resolve(response);
          }
          else if (response.status && response.msg == 'Name Already Exists'){
            resolve({duplicateName:true});
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

  addBadge(badge: Badge){
    let searchedBadge = this.badges.find(findBadge => findBadge._id == badge._id);
    if (searchedBadge && searchedBadge != null){
      searchedBadge.name = badge.name;
    }
    else {
      this.badges.push(badge);
    }

  }

  addShipingBadge(shipingBadge: ShipingBadge){
    let searchedBadge = this.shipingBadges.find(findBadge => findBadge._id == shipingBadge._id);
    if (searchedBadge && searchedBadge != null){
      searchedBadge.name = shipingBadge.name;
    }
    else {
      this.shipingBadges.push(shipingBadge);
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

  getMainShipingBadges() {
    return new Promise(resolve => {
      if (this.shipingBadges && this.shipingBadges.length > 0){
        resolve(this.shipingBadges);
      }
      else {
        resolve(this.getBadgesShiping());
      }

    })
  }
}
