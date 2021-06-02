import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'app/services/interaction.service';
import { ToolsService } from 'app/services/tools.service';

@Component({
  selector: 'app-generating-best-reviews',
  templateUrl: './generating-best-reviews.component.html',
  styleUrls: ['./generating-best-reviews.component.css']
})
export class GeneratingBestReviewsComponent implements OnInit {

  segmentToShow : string = 'code';
  bestReviewsCode: string = '';
  constructor(private interactionService: InteractionService,
                      private toolsService: ToolsService) { }

  ngOnInit(): void {
    this.getBestReviews();
  }

  getBestReviews() {
    this.interactionService.createLoading('Getting Best Reviews');
    this.toolsService.getBestReviews()
      .then((bestReviews:any) => {
        this.interactionService.closeToast();
          if (bestReviews && bestReviews != false){
            this.bestReviewsCode = `<div class="best-reviews-container">
            <div class="best-reviews-item-container">
                <div class="best-reviews-image-container">
                    <img src="https://cdn.shopify.com/s/files/1/0254/2937/7112/files/Mask_Group_22.jpg?v=1618404919">
                </div>
                <div class="best-reviews-text-container">
                    <div class="icon-images">
                        <img src="https://cdn.shopify.com/s/files/1/0254/2937/7112/files/5-stars.png?v=1618404898">
                    </div>
                    <div class="rating-section">
                        My dog loves his new bed! He’s really picky when it comes to where he chooses to sleep, but he loved
                        this one from the first moment. Will probably need to buy one more!
                    </div>
                    <div class="author-review">
                        - Kjersti T.
                    </div>
                </div>
            </div>
            <div class="best-reviews-item-container">
                <div class="best-reviews-image-container">
                    <img src="https://cdn.shopify.com/s/files/1/0254/2937/7112/files/Mask_Group_18.jpg?v=1618404949">
                </div>
                <div class="best-reviews-text-container">
                    <div class="icon-images">
                        <img src="https://cdn.shopify.com/s/files/1/0254/2937/7112/files/5-stars.png?v=1618404898">
                    </div>
                    <div class="rating-section">
                        My both dogs just love this bed! They constantly fight over this bed so now I need to get another
                        one. Super happy with the quality of bed :)
                    </div>
                    <div class="author-review">
                        - Maya V.
                    </div>
                </div>
            </div>
            <div class="best-reviews-item-container">
                <div class="best-reviews-image-container">
                    <img src="https://cdn.shopify.com/s/files/1/0254/2937/7112/files/Mask_Group_21.jpg?v=1618404885">
                </div>
                <div class="best-reviews-text-container">
                    <div class="icon-images">
                        <img src="https://cdn.shopify.com/s/files/1/0254/2937/7112/files/5-stars.png?v=1618404898">
                    </div>
                    <div class="rating-section">
                        Amazing bed! It is probably the shape that makes it so comfy for pets… mine is totally in love with
                        it and it is a lot cheaper than most beds on the market! Will see how long it lasts but so far so
                        good.
                    </div>
                    <div class="author-review">
                        - Rita L.
                    </div>
                </div>
            </div>

        </div>`;
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

  buildBestReviews(bestReviews: [{mainImgUrl:'',descriptionReview:'',authorReview:'',status:'active',_id:''}]) {
    let bestReviewCode = '<div class="best-reviews-container">';
    bestReviews.map((bestReview) => {
      if (bestReview.status == 'active'){
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
      }
    })
    bestReviewCode += '</div>';
    console.log(bestReviewCode);
    return bestReviewCode;
  }

}
