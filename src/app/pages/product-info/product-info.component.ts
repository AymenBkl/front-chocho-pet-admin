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

  onChangeSelect(event,id){
    console.log(event,id);
    $(`option-${event}-input-${id}`).fadeIn(2000);
  }


  getSelectOption() {
    $(document).ready(() => {
      $('#select-product-1').on('change', function() {
        console.log($('#select-product-1').val());
      });
    })
  }


}
