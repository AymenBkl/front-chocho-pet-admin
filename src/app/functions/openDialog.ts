import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FilterOrderComponent } from "app/components/filter-order/filter-order.component";
import { GeneratingBestReviewsComponent } from "app/components/generating-best-reviews/generating-best-reviews.component";
import { ProductdescriptionviewerComponent } from "app/components/productdescriptionviewer/productdescriptionviewer.component";
import { ResetpasswordComponent } from "app/components/resetpassword/resetpassword.component";
import { UpdateLinkComponent } from "app/components/update-link/update-link.component";
import { Product } from "app/interface/product";

export function callResetPassword(dialog: MatDialog): MatDialogRef<ResetpasswordComponent,any> {

  const dialogToOpen = dialog.open(ResetpasswordComponent, {
    width: '50%',
    height: '50%',
    panelClass: 'mat-dialog-container-reset-password'
  });

  return dialogToOpen;
}

export function generateCodeProduct(dialog: MatDialog,productId:any): MatDialogRef<ProductdescriptionviewerComponent,any> {

  const dialogToOpen = dialog.open(ProductdescriptionviewerComponent, {
    width: '80%',
    height: '80%',
    panelClass: 'mat-dialog-generate-code',
    data: productId
  });

  return dialogToOpen;
}

export function generateCodeBestReviews(dialog: MatDialog): MatDialogRef<GeneratingBestReviewsComponent,any> {

  const dialogToOpen = dialog.open(GeneratingBestReviewsComponent, {
    width: '80%',
    height: '80%',
    panelClass: 'mat-dialog-generate-code',
  });

  return dialogToOpen;
}


export function callFilter(dialog: MatDialog,options:any): MatDialogRef<FilterOrderComponent,any> {

  const dialogToOpen = dialog.open(FilterOrderComponent, {
    width: '50%',
    height: '50%',
    panelClass: 'mat-dialog-container-reset-password',
    data: options
  });

  return dialogToOpen;
}

export function callUpdateLink(dialog: MatDialog,product:Product): MatDialogRef<UpdateLinkComponent,any> {

  const dialogToOpen = dialog.open(UpdateLinkComponent, {
    width: '0',
    height: '0',
    panelClass: 'mat-dialog-container-update-link',
    data: product
  });

  return dialogToOpen;
}

