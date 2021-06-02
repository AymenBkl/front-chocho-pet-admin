import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'app/services/interaction.service';
import { ToolsService } from 'app/services/tools.service';

@Component({
  selector: 'app-generate-code-best-tips',
  templateUrl: './generate-code-best-tips.component.html',
  styleUrls: ['./generate-code-best-tips.component.css']
})
export class GenerateCodeBestTipsComponent implements OnInit {

  segmentToShow : string = 'code';
  bestTipsCode: string = '';
  constructor(private interactionService: InteractionService,
                      private toolsService: ToolsService) { }

  ngOnInit(): void {
    this.getBestTips();
  }

  getBestTips() {
    this.interactionService.createLoading('Getting Best Tips');
    this.toolsService.getBestTips()
      .then((bestTips:any) => {
        this.interactionService.closeToast();
          if (bestTips && bestTips != false){
            this.bestTipsCode = this.buildBestTips(bestTips)
            this.interactionService.displayToaster('Best tips Loadded Succesfully','success','LOADED');
          }
          else {
            this.interactionService.displayToaster('Error While Loading Best Tips','error','ERROR');
          }
      })
      .catch(err => {
        this.interactionService.closeToast();
        if (err && err.status == '404' && err.error && err.error.err == 'YOU HAVE NO TIPS'){
          this.interactionService.displayToaster('You Don"t have any Best Tips','warning','WARNING');
        }
        else {
          this.interactionService.displayToaster('Error While Loading Best Tips','error','ERROR');
        }
      })
  }

  buildBestTips(bestTips: [{title:'',mainImageUrl:'',description:'',status:'active',_id:''}]) {
    let bestTipsCode = '<div class="best-reviews-container">';
    bestTips.map((bestReview) => {
      if (bestReview.status == 'active'){
        bestTipsCode += `<div class="best-tips-item-container">
        <div class="best-tips-image-container">
            <img src="${bestReview.mainImageUrl}">
        </div>
        <div class="best-tips-text-container">
            <h1 class="header-tips-container">TIPS</h1>

            <div class="header-text-tips">
                <h3>${bestReview.title}</h3>
            </div>
            <div class="rating-section">
                ${bestReview.description}
            </div>

        </div>
    </div>`;
      }
    })
    bestTipsCode += '</div>';
    return bestTipsCode;
  }

}
