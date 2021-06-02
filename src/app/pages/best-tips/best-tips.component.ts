import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-best-tips',
  templateUrl: './best-tips.component.html',
  styleUrls: ['./best-tips.component.css']
})
export class BestTipsComponent implements OnInit {

  bestTipsForm = {titleTips:'',mainImageUrl:'',description:'',status:'active',_id:''};
  formTips = []
  constructor() { }

  ngOnInit(): void {
    this.addAnotherForm();
  }

  addAnotherForm(fields = {titleTips:'',mainImageUrl:'',description:'',status:'active',_id:''}) {
    let formTipsLength = this.formTips.length + 1;
    this.formTips.push({
      value:fields,
      formId:formTipsLength,
      selectOption:fields.mainImageUrl != '' ? 'url' : 'none'
    })
  }

  submitForm() {

  }

  openGenerateBestTips() {

  }


  deleteTipsForm(id:number){

  }

  activeFormTips(id:number) {

  }

  onChangeSelect(id:number){
    console.log(this.formTips.find(tipForm => tipForm.formId == id).selectOption)
  }

  openUploadFile(id:number) {
    $(`#tips-form-${id}`).find('.file-input').click();
  }





}
