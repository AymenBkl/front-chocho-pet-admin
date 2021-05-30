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
  constructor(private route: ActivatedRoute,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.getCurrentProduct();
  }


  getCurrentProduct() {
    this.route.params.subscribe(params => {
      this.product = this.storageService.getProduct(params['id']);
      console.log(this.product);
    });
  }


}
