import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ComplaintResponseComponent } from "../components/complaint-response/complaint-response.component";
export function callResponseComplaint(dialog: MatDialog,incomingdData:any): MatDialogRef<ComplaintResponseComponent,any> {

  const dialogToOpen = dialog.open(ComplaintResponseComponent, {
    width: '50%',
    height: '60%',
    panelClass: 'mat-dialog-container-reset-password',
    data: incomingdData
  });

  return dialogToOpen;
}
