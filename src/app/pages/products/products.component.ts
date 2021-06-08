import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { callFilter, callUpdateLink } from 'app/functions/openDialog';
import { Badge } from 'app/interface/badge';
import { Product } from 'app/interface/product';
import { InteractionService } from 'app/services/interaction.service';
import { ProductsService } from 'app/services/products.service';
import { StorageService } from 'app/services/storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  products: Product[];
  searchProduct: Product[];
  @ViewChild('files') files: ElementRef;
  sortOption : string = 'datedesc';
  selectedIndex:number;
  filterOptions:{dateCreateMAx:string,dateCreateMin:string} = {dateCreateMAx:new Date().toISOString(),dateCreateMin:new Date().toISOString()};
  badges : Badge[];
  constructor(private productService: ProductsService,
              private interactionService: InteractionService,
              private matDialog: MatDialog,
              private storageService: StorageService) { }


  ngOnInit(): void {
    this.getProducts();
    this.getBadges();
  }

  getProducts() {
    this.interactionService.createLoading('Loading Your Products Please Wait !');
    this.productService.getProducts()
      .then(async (result:any) => {
        console.log(result);
        this.interactionService.closeToast();
        if (result && result != false) {
          this.products = result.filter(product => product.status == 'active');
          this.searchProduct = this.products;
          this.interactionService.displayToast('Products Loadded',false,'success');
        }
        else {
          this.interactionService.displayToast('Something Went Wrong !',false,'error');
        }
      })
      .catch(err => {
        console.log(err);
        this.interactionService.displayToast('Something Went Wrong !',false,'error');
      })
  }

  openImageInput(selectedIndex:number) {
    this.selectedIndex = selectedIndex;
    this.files.nativeElement.click();
  }

  goProductInfo(product: Product) {
    this.storageService.saveProduct(product);
    window.open(`/#/product-info/${product.productId}`, '_blank')
  }





  search(event: Event) {
    if (this.products && this.searchProduct) {
      const filterValue = (event.target as HTMLInputElement).value;
      console.log(JSON.stringify(this.products[0]));
      this.searchProduct = this.products.filter(order => JSON.stringify(order).toLowerCase().includes(filterValue.trim().toLowerCase()));
    }
  }

  sortMethod() {
    if (this.searchProduct && this.searchProduct.length > 0 ){
      if (this.sortOption == 'dateasc'){
        this.sortByDateAsc();
      }
      else if (this.sortOption == 'datedesc'){
        this.sortByDateDesc();
      }
    }
  }


  sortByDateAsc() {
    this.searchProduct.sort((a,b) => a.createdAt.localeCompare(b.createdAt))
  }

  sortByDateDesc() {
    this.searchProduct.sort((a,b) => a.createdAt.localeCompare(b.createdAt))
  }

  callFilterOrderComponent(){
    const filterDialog = callFilter(this.matDialog,this.filterOptions);
    filterDialog.afterClosed().subscribe(result => {
      if (result && result != null){
        this.filterOptions = result;
        this.applyFilter();
      }

    })
  }

  refreshProducts() {
    this.interactionService.displayToast("Refreshing Products",true,'info');
    this.productService.refreshProducts()
      .then((result:any) => {
        console.log(result);
        this.interactionService.closeToast();
        if (result && result != false){
          this.interactionService.displayToast("Products refreshed Succesfully",false,'success');
          this.getProducts();
        }
        else {
          this.interactionService.displayToast("Something Went Wrong !",false,'error');
        }
      })
      .catch(err => {
        console.log(err);

        this.interactionService.displayToast("Something Went Wrong !",false,'error');
      })
  }

  applyFilter(){
    this.searchProduct = this.products.filter(
      product =>
      (this.filterOptions.dateCreateMAx.localeCompare(product.createdAt) >= 1)
       && (product.createdAt.localeCompare(this.filterOptions.dateCreateMin) >= 1 ) )
  }

  updateCall(product:Product){
    callUpdateLink(this.matDialog,{product:product,badges:this.badges});
  }

  ngOnDestroy(): void {
    this.productService.onDestroy();
  }

  getBadges() {
    this.productService.getMainBadges()
      .then((result:any) => {
        this.interactionService.closeToast();
        if (result && result != false && result.status != 'not found'){
          this.badges = result;
        }
        else if (result && result != false && result.status == 'not found') {
        }
        else {
        }
      })
      .catch(err => {
        console.log(err);
      })
  }



}
