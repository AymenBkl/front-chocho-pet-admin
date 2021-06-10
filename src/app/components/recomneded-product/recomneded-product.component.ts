import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'app/interface/product';

@Component({
  selector: 'app-recomneded-product',
  templateUrl: './recomneded-product.component.html',
  styleUrls: ['./recomneded-product.component.css']
})
export class RecomnededProductComponent implements OnInit {

  products: Product[] = [];
  selectForms : any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: {products:Product[],product:Product},) { }

  ngOnInit(): void {
    this.products = this.data.products;
    this.addForm();
  }


  submitProducts(){
    let validSelectForms = [];
    this.selectForms.map((selectForm,indx) => {
      console.log(selectForm.selectOption && selectForm.selectOption != 'None')
      if (selectForm.selectOption && selectForm.selectOption != 'None'){
        validSelectForms.push({productId:selectForm.selectOption,status:selectForm.status});
        selectForm.error = '';
      }
      else {
        selectForm.error = 'Please Pick Product';
      }
      console.log(selectForm,indx);
    })
  }


  addForm(){
    let selectFormLength = this.selectForms.length;
    this.selectForms.push({
      selectOption:'None',
      formId:selectFormLength,
      status:'active',
      error:''
    })
  }

  deleteRecomendedProduct(id){
    this.selectForms[id].status = 'deleted';
  }

  activeRecomendedProduct(id){
    this.selectForms[id].status = 'active';
  }



}
