import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'app/interface/product';
import { StorageService } from 'app/services/storage.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  product: Product;
  formDescriptionProduct = [];
  selectOption = [];
  constructor(private route: ActivatedRoute,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.getCurrentProduct();
    this.getSelectOption();
  }


  getCurrentProduct() {
    this.route.params.subscribe(params => {
      this.product = this.storageService.getProduct(params['id']);
      if (this.product && this.product.description && this.product.description.length > 0){

      }
      else if (this.product && (!this.product.description || (this.product.description && this.product.description.length == 0))){
        this.initFirstForm(1);
      }

    });
  }

  initFirstForm(formNumber:number) {
    this.formDescriptionProduct = [
      {
        idFields : {
          cardId:formNumber,
          selectOptionImageId:formNumber,
          'option-file':formNumber,
          'option-file-input':formNumber,
          'option-url':formNumber,
          'option-url-input':formNumber,
          'selectOptionBadgeId':'badge-' + formNumber,
          'option-file-badge':formNumber,
          'option-file-input-badge':formNumber,
          'option-url-badge':formNumber,
          'option-url-input-badge':formNumber,
          'header':formNumber,
          'header-input':formNumber,
          'header-description':formNumber,
          'header-description-input':formNumber
        },
        status:"active"
      }
    ]
  }

  addAnotherForm() {
    let lenghtFormDescriptionProduct = this.formDescriptionProduct.length + 1;
    this.formDescriptionProduct.push({
      idFields : {
        cardId:lenghtFormDescriptionProduct,
        selectOptionImageId:lenghtFormDescriptionProduct,
        'option-file':lenghtFormDescriptionProduct,
        'option-file-input':lenghtFormDescriptionProduct,
        'option-url':lenghtFormDescriptionProduct,
        'option-url-input':lenghtFormDescriptionProduct,
        'selectOptionBadgeId':'badge-' + lenghtFormDescriptionProduct,
        'option-file-badge':lenghtFormDescriptionProduct,
        'option-file-input-badge':lenghtFormDescriptionProduct,
        'option-url-badge':lenghtFormDescriptionProduct,
        'option-url-input-badge':lenghtFormDescriptionProduct,
        'header':lenghtFormDescriptionProduct,
        'header-input':lenghtFormDescriptionProduct,
        'header-description':lenghtFormDescriptionProduct,
        'header-description-input':lenghtFormDescriptionProduct
      },
      status:"active"

    })
  }

  deleteFormProduct(index:number) {
    this.formDescriptionProduct[index - 1].status = 'deleted';
  }

  activeFormProduct(index:number){
    this.formDescriptionProduct[index - 1].status = 'active';
  }

  submitForms(){

  }

  onChangeSelect(event,id){
    console.log(event,id);
    if (event == 'file'){
      $(`#option-url-${id}`).hide();
    }
    else if (event == 'url'){
      $(`#option-file-${id}`).hide();

    }
    $(`#option-${event}-${id}`).fadeIn(2000);
  }

  onChangeSelectBadge(event,id){
    console.log(event,`#option-${event}-${id}`);
    if (event == 'file'){
      $(`#option-url-badge-${id}`).hide();
    }
    else if (event == 'url'){
      $(`#option-file-badge-${id}`).hide();

    }
    $(`#option-${event}-${id}`).fadeIn(2000);
  }


  getSelectOption() {
    $(document).ready(() => {
      $('#select-product-1').on('change', function() {
        console.log($('#select-product-1').val());
      });
    })
  }


}
