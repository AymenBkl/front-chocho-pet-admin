import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Badge } from 'app/interface/badge';
import { Product } from 'app/interface/product';
import { ProductsService } from 'app/services/products.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-update-link',
  templateUrl: './update-link.component.html',
  styleUrls: ['./update-link.component.css']
})
export class UpdateLinkComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {product:Product,badges:Badge[]},
  public dialogRef: MatDialogRef<UpdateLinkComponent>,
  private productService: ProductsService) { }

  ngOnInit(): void {
    this.createInputSwal();
  }

  async createInputSwal() {
    let inputOptions = {'60b92e5d8f89e532a06cd2ff':'None'};
    this.data.badges.map((badge) => {
      if (badge.status == 'active'){
        inputOptions[badge._id] = badge.name
      }
    })
    const { value: badge } = await Swal.fire({
      title: 'Select field validation',
      input: 'select',
      inputOptions,
      inputPlaceholder: 'Select Badge',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        return new Promise(async (resolve) => {
          return this.updateProduct(value);
        })
      }
    })

  }

  updateProduct(badgeId:string) {
    return new Promise((resolve,reject) => {
      this.productService.updateProductLink(this.data.product.productId,badgeId)
      .then((result) => {
        console.log(result);
        if (result && result != false){
          Swal.close();
          this.dialogRef.close({status:true,badge:result});
          resolve(true);
        }
        else {
          resolve(false);
          Swal.showValidationMessage(
          `Request failed: Something Went Wrong`
        )
        }
      })
      .catch(err => {
        reject(err);
        this.dialogRef.close();
        console.log(err);
        Swal.showValidationMessage(
          `Request failed: Something Went Wrong`
        )
      })
    })

  }

}
