import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ShipingBadge } from 'app/interface/shipingBadge';
import { ImgbbService } from 'app/services/imgbb.service';
import { InteractionService } from 'app/services/interaction.service';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'app-shiping-badge',
  templateUrl: './shiping-badge.component.html',
  styleUrls: ['./shiping-badge.component.css']
})
export class ShipingBadgeComponent implements OnInit {

  badge:any;
  @ViewChild('files') files: ElementRef;
  image: { imageSrc: any, file: any } = {imageSrc: null,file:null};
  submited:boolean = false;
  errorMessage:string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: ShipingBadge,
              private interactionService: InteractionService,
              private productService: ProductsService,
              private domSanitizer: DomSanitizer,
              private imgbb: ImgbbService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.initBadge();
  }


  initBadge(){
      this.badge = {
        _id:this.data && this.data._id ? this.data._id : '',
        color:this.data && this.data.color ? this.data.color : '#000',
        createdAt:this.data && this.data.createdAt ? this.data.createdAt : '',
        mainImgUrl:this.data && this.data.mainImgUrl ? this.data.mainImgUrl : '',
        name:this.data && this.data.name ? this.data.name : '',
        status:this.data && this.data.status && this.data.status == '' ? this.data._id : 'active',
        selectOption:this.data && this.data.name ? 'url' : '',
      };
      console.log(this.badge);
  }

  openUploadFile() {
    this.files.nativeElement.click();
  }

  selectedImage(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.image.imageSrc = reader.result;
      this.image.imageSrc = this.domSanitizer.bypassSecurityTrustUrl(this.image.imageSrc);
      reader.readAsDataURL(file);
      this.image.file = file;
    }
  }

  submitBadge() {
    this.submited = true;
    if (this.badge.selectOption == 'file' && this.image.imageSrc){
      this.interactionService.displayToast('Submitting badge Please wait !',true,'info');
      this.imgbb.uploadImage(this.image.file)
        .then((result:any) => {
          this.interactionService.closeToast();
          if (result){
            this.interactionService.displayToaster('Image uploaded successfully','success','UPLOADED');
            this.badge.mainImgUrl = result;
            this.saveBadge();
          }
          else {
            this.submited = false;
            this.interactionService.displayToaster('Error While Uploading Image','error','ERROR');
          }
        })
        .catch(err => {
          this.submited = false;
          this.interactionService.closeToast();
          this.interactionService.displayToaster('Error While Uploading Image','error','ERROR');
        })
    }
    else {
      this.saveBadge();
    }
  }

  saveBadge() {
    this.interactionService.displayToast('Submitting badge Please wait !',true,'info');
    console.log(this.badge);
    this.productService.saveBadgeShiping(this.badge)
      .then((result:any) => {
        this.submited = false;
        this.interactionService.closeToast();
        if (result && result != false && result.status == 200){
          this.interactionService.displayToast('Badge Saved Successfully',false,'success');
        }
        else if (result && result.duplicateName == true){
          this.interactionService.displayToaster('Badge Name Exists','warning','WARNING');
          this.errorMessage = 'Name Already Exists';
          console.log(this.errorMessage);
        }
        else {
          this.interactionService.displayToaster('Error Saving badge','error','ERROR');
        }
      })
      .catch(err => {
        this.submited = false;
        this.interactionService.closeToast();
        this.interactionService.displayToaster('Error Saving badge','error','ERROR');
      })
  }

}
