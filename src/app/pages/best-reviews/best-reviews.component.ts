import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-best-reviews',
  templateUrl: './best-reviews.component.html',
  styleUrls: ['./best-reviews.component.css']
})
export class BestReviewsComponent implements OnInit {

  bestReviewsForm:{mainImgUrl:'',descriptionReview:'',authorReview:'',status:''};
  constructor() { }

  ngOnInit(): void {
  }


  openUploadFile(id,type) {

  }

  onChangeSelect(event,id) {

  }
}
