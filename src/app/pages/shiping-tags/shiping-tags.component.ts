import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { calladdShipingBadge } from 'app/functions/openDialog';
import { ShipingBadge } from 'app/interface/shipingBadge';
import { InteractionService } from 'app/services/interaction.service';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'app-shiping-tags',
  templateUrl: './shiping-tags.component.html',
  styleUrls: ['./shiping-tags.component.css']
})
export class ShipingTagsComponent implements OnInit {

  badges: ShipingBadge[];
  constructor(private interactionService: InteractionService,
              private productService: ProductsService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getBadges();
  }

  getBadges() {
    this.interactionService.createLoading("Loading badges Please Wait");
    this.productService.getMainShipingBadges()
      .then((result:any) => {
        this.interactionService.closeToast();
        if (result && result != false && result.status != 'not found'){
          this.badges = result;
          this.interactionService.displayToast('Shiping Badges Loadded Successfully',false,'success');
        }
        else if (result && result != false && result.status == 'not found') {
          this.interactionService.displayToast('You have no Shiping badges',false,'warning');
        }
        else {
          this.interactionService.displayToast('Something Went Wrong !',false,'error');
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  updateBadge(badge:ShipingBadge){
    let dialog = calladdShipingBadge(this.matDialog,badge)
    dialog.afterClosed().subscribe(result => {

    })
  }


  addBadge() {
    let dialog = calladdShipingBadge(this.matDialog,null)
    dialog.afterClosed().subscribe(result => {

    })
  }

  changeStatusBadge(badge:ShipingBadge,status:string){
    badge.status = status;
    this.interactionService.displayToast('Submitting shiping badge Please wait !',true,'info');
    console.log(badge);
    this.productService.saveBadgeShiping(badge)
      .then((result:any) => {
        this.interactionService.closeToast();
        if (result && result != false && result.status == 200){
          this.interactionService.displayToast('Shiping Badge Saved Successfully',false,'success');
        }
        else {
          this.interactionService.displayToaster('Error Saving shiping badge','error','ERROR');
        }
      })
      .catch(err => {
        this.interactionService.closeToast();
        this.interactionService.displayToaster('Error Saving shiping badge','error','ERROR');
      })
  }

}
