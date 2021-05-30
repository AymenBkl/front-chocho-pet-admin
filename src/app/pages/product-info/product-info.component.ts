import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'app/interface/product';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  product: Product;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCurrentProduct();
  }


  getCurrentProduct() {
    this.route.params.subscribe(params => {
      this.product = JSON.parse(this.route.snapshot.paramMap.get('productObj'));
      console.log(this.product);
    });
  }


}
