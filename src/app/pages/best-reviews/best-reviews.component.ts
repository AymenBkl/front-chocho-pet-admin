import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-best-reviews',
  templateUrl: './best-reviews.component.html',
  styleUrls: ['./best-reviews.component.css']
})
export class BestReviewsComponent implements OnInit {

  bestReviewsForm:{mainImgUrl:'',descriptionReview:'',authorReview:'',status:''};
  formFields = [];
  constructor() { }

  ngOnInit(): void {
    this.addFormField();
  }

  addFormField(fields = {mainImgUrl:'',descriptionReview:'',authorReview:'',status:''}) {
    let lenghtFormField = this.formFields.length;
    this.formFields.push({
      value:fields,
      formId:lenghtFormField + 1
    })
  }

  addAnotherForm() {
    this.addFormField();
  }


  openUploadFile(id,type) {
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
