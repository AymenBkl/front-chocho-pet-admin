import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddBadgeComponent } from "app/components/add-badge/add-badge.component";
import { FilterOrderComponent } from "app/components/filter-order/filter-order.component";
import { GenerateCodeBestTipsComponent } from "app/components/generate-code-best-tips/generate-code-best-tips.component";
import { GeneratingBestReviewsComponent } from "app/components/generating-best-reviews/generating-best-reviews.component";
import { ProductdescriptionviewerComponent } from "app/components/productdescriptionviewer/productdescriptionviewer.component";
import { ResetpasswordComponent } from "app/components/resetpassword/resetpassword.component";
import { UpdateLinkComponent } from "app/components/update-link/update-link.component";
import { Badge } from "app/interface/badge";

export function callResetPassword(dialog: MatDialog): MatDialogRef<ResetpasswordComponent,any> {

  const dialogToOpen = dialog.open(ResetpasswordComponent, {
    width: '50%',
    height: '50%',
    panelClass: 'mat-dialog-container-reset-password'
  });

  return dialogToOpen;
}

export function calladdBadge(dialog: MatDialog,badge:Badge): MatDialogRef<AddBadgeComponent,any> {

  const dialogToOpen = dialog.open(AddBadgeComponent, {
    width: '50%',
    height: '50%',
    panelClass: 'mat-dialog-container-reset-password',
    data:badge
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

export function generateCodeBestTips(dialog: MatDialog): MatDialogRef<GenerateCodeBestTipsComponent,any> {

  const dialogToOpen = dialog.open(GenerateCodeBestTipsComponent, {
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

export function callUpdateLink(dialog: MatDialog,product:any): MatDialogRef<UpdateLinkComponent,any> {

  const dialogToOpen = dialog.open(UpdateLinkComponent, {
    width: '0',
    height: '0',
    panelClass: 'mat-dialog-container-update-link',
    data: product
  });

  return dialogToOpen;
}

