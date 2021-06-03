import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InteractionService } from 'app/services/interaction.service';
import { ToolsService } from 'app/services/tools.service';
import * as $ from "jquery";

@Component({
  selector: 'app-generate-code-best-tips',
  templateUrl: './generate-code-best-tips.component.html',
  styleUrls: ['./generate-code-best-tips.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class GenerateCodeBestTipsComponent implements OnInit {

  segmentToShow : string = 'code';
  bestTipsCode: string = '';
  slideCarouselConfig = {
    "infinite": true,
    "autoplay": false,
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "pauseOnHover": true,
    "arrows": true,
    "prevArrow": '<button type="button" class="slick-prev-carousel"><img class="left_arrow" src="https://cdn.shopify.com/s/files/1/0254/2937/7112/files/Icon_feather-arrow-left-circle-1.png?v=1618817807"></button>',
    "nextArrow": '<button type="button" class="slick-next-carousel"><img class="right_arrow" src="https://cdn.shopify.com/s/files/1/0254/2937/7112/files/Icon_feather-arrow-left-circle.png?v=1618817807"></button>',
  };
  bestTips : {title:'',mainImageUrl:'',description:'',status:'active',_id:'',position:number}[];
  constructor(private interactionService: InteractionService,
                      private toolsService: ToolsService,
                      private clipboard: Clipboard,
                      private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getBestTips();
  }

  getBestTips() {
    this.interactionService.createLoading('Getting Best Tips');
    this.toolsService.getBestTips()
      .then((bestTips:any) => {
        this.interactionService.closeToast();
          if (bestTips && bestTips != false){
            this.bestTips = bestTips;
            this.bestTipsCode = this.buildBestTips()
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



  buildBestTips() {
    let bestTipsCode = '<div class="best-tips-container">';
    this.bestTips = this.bestTips.sort((a,b) => a.position - b.position)
    this.bestTips = this.bestTips.filter(bestTip => bestTip.status == 'active');
    this.bestTips.map((bestTip) => {
        bestTipsCode += `<div class="best-tips-item-container">

        <div class="best-tips-image-container">
            <img src="${bestTip.mainImageUrl}">
        </div>
        <div class="best-tips-text-container">
            <h1 class="header-tips-container">TIPS</h1>

            <div class="header-text-tips">
                <h3>${bestTip.title}</h3>
            </div>
            <div class="rating-section">
                ${bestTip.description}
            </div>

        </div>
    </div>`;
    })
    bestTipsCode += '</div>';
    return bestTipsCode;
  }

  copyCode() {
    this.clipboard.copy(this.bestTipsCode);
    $('.copied-holder').css('display','flex').hide().fadeIn(1200).fadeOut(1200);
  }

  close() {
    this.matDialog.closeAll();
  }

  switchSegments(segment:string){
    this.segmentToShow = segment;

  }





}
