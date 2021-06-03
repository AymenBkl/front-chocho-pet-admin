import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Badge } from 'app/interface/badge';
import { InteractionService } from 'app/services/interaction.service';
import { ProductsService } from 'app/services/products.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-badge',
  templateUrl: './add-badge.component.html',
  styleUrls: ['./add-badge.component.css']
})
export class AddBadgeComponent implements OnInit {

  badge:any;
  @ViewChild('files') files: ElementRef;
  image: { imageSrc: any, file: any } = {imageSrc: null,file:null};
  constructor(@Inject(MAT_DIALOG_DATA) public data: Badge,
              private interactionService: InteractionService,
              private productService: ProductsService,
              private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.initBadge();
  }


  initBadge(){

      this.badge = {
        _id:this.data && this.data._id ? this.data._id : '',
        createdAt:this.data && this.data.createdAt ? this.data.createdAt : '',
        mainImgUrl:this.data && this.data.mainImgUrl ? this.data.mainImgUrl : '',
        name:this.data && this.data.name ? this.data.name : '',
        status:this.data && this.data.status ? this.data._id : '',
        selectOption:this.data && this.data.name ? 'url' : '',
      };
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
      console.log();
      reader.readAsDataURL(file);
      this.image.file = file;
    }
  }

}
