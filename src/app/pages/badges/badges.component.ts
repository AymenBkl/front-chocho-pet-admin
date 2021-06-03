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


  addBadge() {
    let dialog = calladdBadge(this.matDialog,null)
    dialog.afterClosed().subscribe(result => {

    })
  }

}
