import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InteractionService } from 'app/services/interaction.service';
import { ToolsService } from 'app/services/tools.service';

@Component({
  selector: 'app-generating-best-reviews',
  templateUrl: './generating-best-reviews.component.html',
  styleUrls: ['./generating-best-reviews.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class GeneratingBestReviewsComponent implements OnInit {

  segmentToShow : string = 'html';
  bestReviewsCode: string = '';
  bestReviews: {mainImgUrl:'',descriptionReview:'',authorReview:'',status:'active',_id:'',position:number}[];
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
  constructor(private interactionService: InteractionService,
                      private toolsService: ToolsService,
                      private clipboard: Clipboard,
                      private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getBestReviews();
  }

  getBestReviews() {
    this.interactionService.createLoading('Getting Best Reviews');
    this.toolsService.getBestReviews()
      .then((bestReviews:any) => {
        this.interactionService.closeToast();
          if (bestReviews && bestReviews != false){
            this.bestReviews = bestReviews;
            this.bestReviewsCode = this.buildBestReviews();
            this.interactionService.displayToaster('Best Reviews Loadded Succesfully','success','LOADED');
          }
          else {
            this.interactionService.displayToaster('Error While Loading Best Reviews','error','ERROR');
          }
      })
      .catch(err => {
        this.interactionService.closeToast();
        if (err && err.status == '404' && err.error && err.error.err == 'YOU HAVE NO REVIEWS'){
          this.interactionService.displayToaster('You Don"t have any Best Reviews','warning','WARNING');
        }
        else {
          this.interactionService.displayToaster('Error While Loading Best Reviews','error','ERROR');
        }
      })
  }

  buildBestReviews() {
    let bestReviewCode = '<div class="best-reviews-container">';
    this.bestReviews= this.bestReviews.sort((a,b) => a.position - b.position)
    this.bestReviews = this.bestReviews.filter(bestTip => bestTip.status == 'active');
    this.bestReviews.map((bestReview) => {
        bestReviewCode += `<div class="best-reviews-item-container">
        <div class="best-reviews-image-container">
            <img src="${bestReview.mainImgUrl}">
        </div>
        <div class="best-reviews-text-container">
            <div class="icon-images">
                <img src="https://cdn.shopify.com/s/files/1/0254/2937/7112/files/5-stars.png?v=1618404898">
            </div>
            <div class="rating-section">
                ${bestReview.descriptionReview}
            </div>
            <div class="author-review">
                - ${bestReview.authorReview}
            </div>
        </div>
    </div>`;

    })
    bestReviewCode += '</div>';
    console.log(bestReviewCode);
    return bestReviewCode;
  }

  copyCode() {
    this.clipboard.copy(this.bestReviewsCode);
    $('.copied-holder').css('display','flex').hide().fadeIn(1200).fadeOut(1200);
  }

  close() {
    this.matDialog.closeAll();
  }

  switchSegments(segment:string){
    if (segment == 'code'){
      this.copyCode();
    }
    this.segmentToShow = segment;

  }

}
