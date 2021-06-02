import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { generateCodeBestReviews } from 'app/functions/openDialog';
import { ImgbbService } from 'app/services/imgbb.service';
import { InteractionService } from 'app/services/interaction.service';
import { ToolsService } from 'app/services/tools.service';
import * as $ from "jquery";

@Component({
  selector: 'app-best-reviews',
  templateUrl: './best-reviews.component.html',
  styleUrls: ['./best-reviews.component.css']
})
export class BestReviewsComponent implements OnInit {

  bestReviewsForm:{mainImgUrl:'',descriptionReview:'',authorReview:'',status:'active',_id:''};
  formFields = [];
  constructor(private interactionService: InteractionService,
              private toolsService: ToolsService,
              private imgbbService: ImgbbService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getBestReviews();
  }

  getBestReviews() {
    this.interactionService.createLoading('Getting Best Reviews');
    this.toolsService.getBestReviews()
      .then((bestReviews) => {
        console.log(bestReviews);
        this.interactionService.closeToast();
          if (bestReviews && bestReviews != false){
            this.formFields = [];
            this.addFormFields(bestReviews);
            this.interactionService.displayToaster('Best Reviews Loadded Succesfully','success','LOADED');
          }
          else {
            this.addFormField();
            this.interactionService.displayToaster('Error While Loading Best Reviews','error','ERROR');
          }
      })
      .catch(err => {
        this.interactionService.closeToast();
        this.addFormField();
        if (err && err.status == '404' && err.error && err.error.err == 'YOU HAVE NO REVIEWS'){
          this.interactionService.displayToaster('You Don"t have any Best Reviews','warning','WARNING');
        }
        else {
          this.interactionService.displayToaster('Error While Loading Best Reviews','error','ERROR');
        }
      })
  }

  addFormFields(reviews) {
    reviews.map((review) => {
      this.addFormField({mainImgUrl:review.mainImgUrl,descriptionReview:review.descriptionReview,authorReview:review.authorReview,status:review.status,_id:review._id});
    })
  }

  addFormField(fields = {mainImgUrl:'',descriptionReview:'',authorReview:'',status:'active',_id:''}) {
    let lenghtFormField = this.formFields.length + 1;
    setTimeout(() => {
      if (fields.mainImgUrl != ''){
        $(`#review-form-${lenghtFormField}`).find('.field-url-review').fadeIn(2000);
      }
    },1500)

    this.formFields.push({
      value:fields,
      formId:lenghtFormField,
      selectOption: fields.mainImgUrl == '' ? 'none' : 'url'
    })
  }

  addAnotherForm() {
    this.addFormField();
  }


  openUploadFile(id) {
    $(`#review-form-${id}`).find('.file-input').click();
  }

  deleteReviewForm(id) {
    this.formFields.find(formField => formField.formId == id).value.status = 'deleted';
  }
  activeFormReview(id) {
    this.formFields.find(formField => formField.formId == id).value.status = 'active';
  }

  submitForm() {
    this.formFields.map((formField) => {
      if (formField.value.status == 'active'){
        let data : any = {};
        data.status = 'active';
        data._id = formField.value._id;
        let reviewForm = $(`#review-form-${formField.formId}`);
        let selectOption = reviewForm.find('.select-option').text();
        console.log(selectOption)
        if (selectOption && selectOption == 'Url') {
          reviewForm.find('.error-mat-select').hide();
          let urlValue = reviewForm.find('.input-url').val();
          if (urlValue && urlValue != ''){
            reviewForm.find('.input-url-error').hide();
            data.mainImgUrl = urlValue;
            delete data.image;
          }
          else {
            reviewForm.find('.input-url-error').show();
          }
        }
        if (selectOption && selectOption == 'File') {
          reviewForm.find('.error-mat-select').hide();
          let files = reviewForm.find('.file-input').prop('files');
          if (files && files.length > 0){
            reviewForm.find('.input-file-error').hide();
            data.image = files[0];
            delete data.mainImgUrl;
          }
          else {
            reviewForm.find('.input-file-error').show();
          }
        }
        else {
          reviewForm.find('.error-mat-select').show();
        }

        let authorVal = reviewForm.find('.input-author').val();
        if (authorVal && authorVal != ''){
          reviewForm.find('.input-author-error').hide();
          data.authorReview = authorVal;
        }
        else {
          reviewForm.find('.input-author-error').show();
        }

        let descriptionReview = reviewForm.find('.input-review').val();
        if (descriptionReview && descriptionReview != '') {
          reviewForm.find('.input-review-description-error').hide();
          data.descriptionReview = descriptionReview;
        }
        else {
          reviewForm.find('.input-review-description-error').show();
        }
        console.log(data);
        if (Object.keys(data).length == 5){
          this.handleDataReview(data,formField.formId);
        }
      }
      else {
        if (formField.value._id != ''){
          this.handleDataReview({status:'deleted',_id:formField.value._id},formField.formId);
        }
      }

    })
  }


  handleDataReview(data,formId) {
    if (data.image) {
      let id = this.interactionService.displayToaster('Uploading Image','loading','UPLOADING');
      $(`#review-form-${formId}`).find('.file-error-upload').hide();
      $(`#review-form-${formId}`).find('.file-success-upload').hide();
      $(`#review-form-${formId}`).find('.review-error-saved').hide();
      $(`#review-form-${formId}`).find('.review-success-saved').hide();
      this.imgbbService.uploadImage(data.image)
        .then((result) => {
            this.interactionService.closeToaster(id);
            if (result && result != '') {
              data.mainImgUrl = result;
              delete data.image;
              this.interactionService.displayToaster('Image Uploaded Successfuly','success','UPLOADED');
              $(`#review-form-${formId}`).find('.file-success-upload').show();
              this.saveDescription(data,formId);
            }
            else {
              this.interactionService.displayToaster('Error While Uploading Image','error','ERROR');
              $(`#review-form-${formId}`).find('.file-error-upload').show();
            }
        })
        .catch(err => {
          this.interactionService.closeToaster(id);
          this.interactionService.displayToaster('Error While Uploading Image','error','ERROR');
          $(`#review-form-${formId}`).find('.file-error-upload').show();
        })
    }
    else {
      this.saveDescription(data,formId)
    }
  }

  saveDescription(data,formId) {
    let id = this.interactionService.displayToaster('Saving Best Review','loading','Saving');
    $(`#review-form-${formId}`).find('.review-error-saved').hide();
    $(`#review-form-${formId}`).find('.review-success-saved').hide();
    this.toolsService.saveBestReviews(data)
      .then((result:any) => {
        console.log(result)
        this.interactionService.closeToaster(id);
        if (result && result != false){
          this.formFields.find(formField => formField.formId == formId).value._id = result._id;
          this.interactionService.displayToaster('Best Review Saved Successfully','success','SAVED');
          $(`#review-form-${formId}`).find('.review-success-saved').show();
        }
        else {
          this.interactionService.displayToaster('Error While Saving Best Review','error','ERROR');
          $(`#review-form-${formId}`).find('.review-error-saved').show();
        }
      })
      .catch(err => {
        this.interactionService.displayToaster('Error While Saving Best Review','error','ERROR');
        $(`#review-form-${formId}`).find('.review-error-saved').show();
      })
  }

  onChangeSelect(event,id) {
    if (event == 'url') {
      $(`#review-form-${id}`).find('.field-url-review').show();
      $(`#review-form-${id}`).find('.field-file-review').hide();
    }
    else if (event == 'file'){
      $(`#review-form-${id}`).find('.field-url-review').hide();
      $(`#review-form-${id}`).find('.field-file-review').show();
    }
  }

  openGenerateBestReviews() {
    let dialog = generateCodeBestReviews(this.matDialog);
    dialog.afterClosed().subscribe(() => {
      this.getBestReviews();
    })
  }
}
