import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { calladdBadge } from 'app/functions/openDialog';
import { Badge } from 'app/interface/badge';
import { InteractionService } from 'app/services/interaction.service';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {

  badges: Badge[];
  constructor(private interactionService: InteractionService,
              private productService: ProductsService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getBadges();
  }

  getBadges() {
    this.interactionService.createLoading("Loading badges Please Wait");
    this.productService.getMainBadges()
      .then((result:any) => {
        this.interactionService.closeToast();
        if (result && result != false && result.status != 'not found'){
          this.badges = result;
          this.interactionService.displayToast('Badges Loadded Successfully',false,'success');
        }
        else if (result && result != false && result.status == 'not found') {
          this.interactionService.displayToast('You have no badges',false,'warning');
        }
        else {
          this.interactionService.displayToast('Something Went Wrong !',false,'error');
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  updateBadge(badge:Badge){
    let dialog = calladdBadge(this.matDialog,badge)
    dialog.afterClosed().subscribe(result => {

    })
  }


  addBadge() {
    let dialog = calladdBadge(this.matDialog,null)
    dialog.afterClosed().subscribe(result => {

    })
  }

  changeStatusBadge(badge:Badge,status:string){
    badge.status = status;
    this.interactionService.displayToast('Submitting badge Please wait !',true,'info');
    console.log(badge);
    this.productService.saveBadge(badge)
      .then((result:any) => {
        this.interactionService.closeToast();
        if (result && result != false && result.status == 200){
          this.interactionService.displayToast('Badge Saved Successfully',false,'success');
        }
        else {
          this.interactionService.displayToaster('Error Saving badge','error','ERROR');
        }
      })
      .catch(err => {
        this.interactionService.closeToast();
        this.interactionService.displayToaster('Error Saving badge','error','ERROR');
      })
  }

}
