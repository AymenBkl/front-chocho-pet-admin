import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'app/interface/product';
import { InteractionService } from 'app/services/interaction.service';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'app-recomneded-product',
  templateUrl: './recomneded-product.component.html',
  styleUrls: ['./recomneded-product.component.css']
})
export class RecomnededProductComponent implements OnInit {

  products: Product[] = [];
  selectForms : any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: {products:Product[],product:Product},
              private interactionService: InteractionService,
              private productService: ProductsService) { }

  ngOnInit(): void {
    this.products = this.data.products;
    this.addForm();
  }


  submitProducts(){
    let validSelectForms = [];
    this.selectForms.map((selectForm,indx) => {
      console.log(selectForm.selectOption && selectForm.selectOption != 'None')
      if (selectForm.selectOption && selectForm.selectOption != 'None'){
        validSelectForms.push({product:selectForm.selectOption,status:selectForm.status});
        selectForm.error = '';
      }
      else {
        selectForm.error = 'Please Pick Product';
      }
    })
    if (validSelectForms && validSelectForms.length > 0){
      this.updateProducts(validSelectForms);
    }
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

  updateProducts(products: Product[]){
    let id = this.interactionService.displayToaster('Updating Products','loading','UPDATING');
    this.productService.updateProductLink(this.data.product.productId,products,'product-recomend')
      .then((result) => {
        console.log(result);
        this.interactionService.closeToaster(id);
        if (result && result != false){
          this.interactionService.displayToaster('Products Updated','success','SUCCESS');
        }
        else {
          this.interactionService.displayToaster('Error While Updating Products','error','error');
        }
      })
      .catch(err => {
        this.interactionService.displayToaster('Error While Updating Products','error','error');
      })
  }



}
