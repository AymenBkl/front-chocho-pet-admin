import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-best-reviews',
  templateUrl: './best-reviews.component.html',
  styleUrls: ['./best-reviews.component.css']
})
export class BestReviewsComponent implements OnInit {

  bestReviewsForm:{mainImgUrl:'',descriptionReview:'',authorReview:'',status:'active'};
  formFields = [];
  constructor() { }

  ngOnInit(): void {
    this.addFormField();
  }

  addFormField(fields = {mainImgUrl:'',descriptionReview:'',authorReview:'',status:'active'}) {
    let lenghtFormField = this.formFields.length;
    this.formFields.push({
      value:fields,
      formId:lenghtFormField + 1
    })
  }

  addAnotherForm() {
    this.addFormField();
  }


  openUploadFile(id) {
    $(`#review-form-${id}`).find('.file-input').click();
  }

  submitForm() {
    let validData = [];
    this.formFields.map((formField) => {
      if (formField.value.status == 'active'){
        let data : any = {};
        data.status = 'active';
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
          let files = reviewForm.find('.input-file').prop('files');
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
        console.log(Object.keys(data).length,data)
        if (Object.keys(data).length == 4){
          console.log('true');
          console.log(data);
        }
      }
      else {
        console.log('save description');
      }

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
}
