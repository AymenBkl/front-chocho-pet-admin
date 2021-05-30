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
  formDescriptionProduct = [
    {
      cardId:'1',
      selectOptionImageId:'1',
      'option-file':'1',
      'option-file-input':'1',
      'option-url':'1',
      'option-url-input':'1',
      'selectOptionBadgeId':'badge-1',
      'option-file-badge':'1',
      'option-file-input-badge':'1',
      'option-url-badge':'1',
      'option-url-input-badge':'1',
      'header':'1',
      'header-input':'1',
      'header-description':'1',
      'header-description-input':'1'

    }
  ]
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
      console.log(this.product);

    });
  }

  addAnotherForm() {

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
    console.log(event,id);
    if (event == 'file'){
      $(`#option-url-${id}`).hide();
    }
    else if (event == 'url'){
      $(`#option-file-${id}`).hide();

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
