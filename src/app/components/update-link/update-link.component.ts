import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'app/interface/product';
import { ProductsService } from 'app/services/products.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-update-link',
  templateUrl: './update-link.component.html',
  styleUrls: ['./update-link.component.css']
})
export class UpdateLinkComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product,
  public dialogRef: MatDialogRef<UpdateLinkComponent>,
  private productService: ProductsService) { }

  ngOnInit(): void {
    this.createInputSwal();
  }

  async createInputSwal() {
    const { value: badge } = await Swal.fire({
      title: 'Select field validation',
      input: 'select',
      inputOptions: {
          New: 'New',
          Hot: 'Hot',
          Sale: 'Sale',
          Best: 'Best',
      },
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

  updateProduct(newLink:string) {
    return new Promise((resolve,reject) => {
      this.productService.updateProductLink(this.data.productId,newLink)
      .then((result) => {
        console.log(result);
        if (result && result != false){
          Swal.close();
          this.dialogRef.close({status:true,productNewLink:newLink});
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
