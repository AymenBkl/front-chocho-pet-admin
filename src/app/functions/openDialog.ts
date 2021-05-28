import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FilterOrderComponent } from "app/components/filter-order/filter-order.component";
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

