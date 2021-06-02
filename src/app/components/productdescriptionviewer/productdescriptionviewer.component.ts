import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InteractionService } from 'app/services/interaction.service';
import { ProductsService } from 'app/services/products.service';
import { StorageService } from 'app/services/storage.service';

@Component({
  selector: 'app-productdescriptionviewer',
  templateUrl: './productdescriptionviewer.component.html',
  styleUrls: ['./productdescriptionviewer.component.css']
})
export class ProductdescriptionviewerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ProductdescriptionviewerComponent>,
  private productService: ProductsService,
  private interactionService: InteractionService,
  private storageService: StorageService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.interactionService.createLoading('Loading Data Please Wait !!');
    this.productService.getProduct(this.data.productId)
      .then((result:any) => {
        if (result && result != false){
          this.storageService.saveProduct(result)
        }
        else {
          this.interactionService.closeToast();
          this.interactionService.displayToast('Something Went Wrong',false,'Error');
        }
      })
      .catch(err => {
        this.interactionService.closeToast();
        this.interactionService.displayToast('Something Went Wrong',false,'Error');
    })
  }

}
