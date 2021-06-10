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
  constructor(@Inject(MAT_DIALOG_DATA) public data: {products:Product[],product:Product},) { }

  ngOnInit(): void {
    this.products = this.data.products;
  }


  submitProducts(){

  }

}
