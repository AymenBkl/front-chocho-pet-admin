import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImgbbService } from 'app/services/imgbb.service';
import { InteractionService } from 'app/services/interaction.service';
import { ToolsService } from 'app/services/tools.service';
import * as $ from "jquery";

@Component({
  selector: 'app-best-tips',
  templateUrl: './best-tips.component.html',
  styleUrls: ['./best-tips.component.css']
})
export class BestTipsComponent implements OnInit {

  bestTipsForm = {titleTips:'',mainImageUrl:'',description:'',status:'active',_id:''};
  formTips = []
  constructor(private interactionService: InteractionService,
              private toolsService: ToolsService,
              private matDialog: MatDialog,
              private imgbbService: ImgbbService) { }

  ngOnInit(): void {
    this.getBestTips();
  }

  getBestTips() {
    this.interactionService.createLoading('Getting Best Tips');
    this.toolsService.getBestTips()
      .then((bestTips:any) => {
        console.log(bestTips);
        this.interactionService.closeToast();
          if (bestTips && bestTips != false){
            this.formTips = [];
            this.addFormFields(bestTips);
            this.interactionService.displayToaster('Best Tips Loadded Succesfully','success','LOADED');
          }
          else {
            this.addAnotherForm();
            this.interactionService.displayToaster('Error While Loading Best Tips','error','ERROR');
          }
      })
      .catch(err => {
        this.interactionService.closeToast();
        this.addAnotherForm();
        if (err && err.status == '404' && err.error && err.error.err == 'YOU HAVE NO TIPS'){
          this.interactionService.displayToaster('You Don"t have any Best Tips','warning','WARNING');
        }
        else {
          this.interactionService.displayToaster('Error While Loading Best Tips','error','ERROR');
        }
      })
  }

  addFormFields(bestTips) {
    bestTips.map((bestTip) => {
      this.addAnotherForm(bestTip);
    })
  }

  addAnotherForm(fields = {titleTips:'',mainImageUrl:'',description:'',status:'active',_id:''}) {
    let formTipsLength = this.formTips.length + 1;
    setTimeout(() => {
      if (fields.mainImageUrl != ''){
        $(`#tips-form-${formTipsLength}`).find('.field-url-tips').fadeIn(2000);
      }
    },500)
    this.formTips.push({
      value:fields,
      formId:formTipsLength,
      selectOption:fields.mainImageUrl != '' ? 'url' : 'none',
      errors:{}
    })
  }

  submitForm() {
    this.formTips.map((formField) => {
      if (formField.value.status == 'active'){
        let data : any = {};
        data.status = 'active';
        data._id = formField.value._id;
        let tipsForm = $(`#tips-form-${formField.formId}`);
        let selectOption = tipsForm.find('.select-option').text();
        console.log(selectOption)
        if (selectOption && selectOption == 'Url') {
          tipsForm.find('.error-mat-select').hide();
          let urlValue = tipsForm.find('.input-url').val();
          if (urlValue && urlValue != ''){
            tipsForm.find('.input-url-error').hide();
            data.mainImageUrl = urlValue;
            delete data.image;
          }
          else {
            tipsForm.find('.input-url-error').show();
          }
        }
        if (selectOption && selectOption == 'File') {
          tipsForm.find('.error-mat-select').hide();
          let files = tipsForm.find('.file-input').prop('files');
          console.log(files);
          if (files && files.length > 0){
            tipsForm.find('.input-file-error').hide();
            data.image = files[0];
            delete data.mainImageUrl;
          }
          else {
            tipsForm.find('.input-file-error').show();
          }
        }
        else {
          tipsForm.find('.error-mat-select').show();
        }

        let title = tipsForm.find('.input-tips').val();
        if (title && title != ''){
          tipsForm.find('.input-tips-error').hide();
          data.title = title;
        }
        else {
          tipsForm.find('.input-tips-error').show();
        }

        let description = tipsForm.find('.input-tips').val();
        if (description && description != '') {
          tipsForm.find('.input-tips-description-error').hide();
          data.description = description;
        }
        else {
          tipsForm.find('.input-tips-description-error').show();
        }
        console.log(data);
        if (Object.keys(data).length == 5){
          this.handleDatatips(data,formField.formId);
        }
      }
      else {
        if (formField.value._id != ''){
          this.handleDatatips({status:'deleted',_id:formField.value._id},formField.formId);
        }
      }

    })
  }

  handleDatatips(data,formId) {
    if (data.image) {
      let id = this.interactionService.displayToaster('Uploading Image','loading','UPLOADING');
      $(`#tips-form-${formId}`).find('.file-error-upload').hide();
      $(`#tips-form-${formId}`).find('.file-success-upload').hide();
      $(`#tips-form-${formId}`).find('.tip-error-saved').hide();
      $(`#tips-form-${formId}`).find('.tip-success-saved').hide();
      this.imgbbService.uploadImage(data.image)
        .then((result) => {
            this.interactionService.closeToaster(id);
            if (result && result != '') {
              data.mainImageUrl = result;
              delete data.image;
              this.interactionService.displayToaster('Image Uploaded Successfuly','success','UPLOADED');
              this.saveDescription(data,formId);
              $(`#tips-form-${formId}`).find('.file-success-upload').show();
            }
            else {
              this.interactionService.displayToaster('Error While Uploading Image','error','ERROR');
              $(`#tips-form-${formId}`).find('.file-error-upload').show();
            }
        })
        .catch(err => {
          this.interactionService.closeToaster(id);
          this.interactionService.displayToaster('Error While Uploading Image','error','ERROR');
          $(`#tips-form-${formId}`).find('.file-error-upload').show();
        })
    }
    else {
      this.saveDescription(data,formId)
    }
  }

  saveDescription(data,formId) {
    let id = this.interactionService.displayToaster('Saving Best tips','loading','Saving');
    $(`#tips-form-${formId}`).find('.tip-error-saved').hide();
    $(`#tips-form-${formId}`).find('.tip-success-saved').hide();
    this.toolsService.saveBestTips(data)
      .then((result:any) => {
        console.log(result)
        this.interactionService.closeToaster(id);
        if (result && result != false){
          this.formTips.find(formField => formField.formId == formId).value._id = result._id;
          this.interactionService.displayToaster('Best tips Saved Successfully','success','SAVED');
          $(`#tips-form-${formId}`).find('.tip-success-saved').show();
        }
        else {
          this.interactionService.displayToaster('Error While Saving Best tips','error','ERROR');
          $(`#tips-form-${formId}`).find('.tip-error-saved').show();
        }
      })
      .catch(err => {
        this.interactionService.closeToaster(id);
        this.interactionService.displayToaster('Error While Saving Best tips','error','ERROR');
        $(`#tips-form-${formId}`).find('.tip-error-saved').show();
      })
  }

  openGenerateBestTips() {

  }


  deleteTipsForm(id:number){

  }

  activeFormTips(id:number) {

  }

  onChangeSelect(event:string,id:number){
    if (event == 'url') {
      $(`#tips-form-${id}`).find('.field-url-tips').show();
      $(`#tips-form-${id}`).find('.field-file-tips').hide();
    }
    else if (event == 'file'){
      $(`#tips-form-${id}`).find('.field-url-tips').hide();
      $(`#tips-form-${id}`).find('.field-file-tips').show();
    }
  }

  openUploadFile(id:number) {
    $(`#tips-form-${id}`).find('.file-input').click();
  }





}
