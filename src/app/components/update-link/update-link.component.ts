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

  createInputSwal() {
    Swal.fire({
      title: 'Update Link',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
        placeHolder:this.data.productLinkPhilips
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
      timer: 1500000,
      preConfirm: (update) => {
        return this.updateProduct(update)
          .then(() => {

          })
          .catch(() => {

          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        Swal.fire({
          title:"LINK UPDATED",
          icon:'success',
        })
      }
      else if (result.isDismissed){
        this.dialogRef.close({status:false});
      }
    })
  }

  updateProduct(newLink:string) {
    return new Promise((resolve,reject) => {
      this.productService.updateProductLink(this.data.productEan,newLink)
      .then((result) => {
        console.log(result);
        if (result && result != false){
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
