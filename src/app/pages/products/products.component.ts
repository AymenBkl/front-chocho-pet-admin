import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { callFilter, callUpdateLink } from 'app/functions/openDialog';
import { Product } from 'app/interface/product';
import { InteractionService } from 'app/services/interaction.service';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  products: Product[];
  searchProduct: Product[];
  image: { imageSrc: any, file: any }[];
  @ViewChild('files') files: ElementRef;
  sortOption : string = 'datedesc';
  selectedIndex:number;
  filterOptions:{dateCreateMAx:string,dateCreateMin:string} = {dateCreateMAx:new Date().toISOString(),dateCreateMin:new Date().toISOString()};
  constructor(private productService: ProductsService,
              private interactionService: InteractionService,
              private matDialog: MatDialog,
              private router: Router) { }


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.interactionService.createLoading('Loading Your Products Please Wait !');
    this.productService.getProducts()
      .then(async (result:any) => {
        console.log(result);
        this.interactionService.closeToast();
        if (result && result != false) {
          this.products = result;
          this.searchProduct = result;
          this.image =   await Array.from({ length: this.products.length }, () => Object.assign({imageSrc:null,file:null}));
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
    this.router.createUrlTree(['/product-info', {productObj: JSON.stringify(product)}]);
    window.open(`/#/product-info/${product.productId}`, '_blank')
  }

  selectedImage(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.image[this.selectedIndex].imageSrc = reader.result;
      reader.readAsDataURL(file);
      this.image[this.selectedIndex].file = file;
    }
  }

  /**uploadImage(index:number,product:Product){
    if (this.image[index].imageSrc && this.image[index].file) {
      this.interactionService.confirmBox('ALERT', 'Do you want to update product image', 'warning', 'UPDATE', 'CANCEL', '')
        .then((result:any) => {
          if (result && result.status == true) {
            const formData = new FormData();
            console.log(this.image[index].file);
            formData.append('file', this.image[index].file);
            formData.append('ean', product.productEan);
            this.interactionService.displayToast('Uploading Image', true, 'info');
              //this.submitted = true;
              this.productService.postImage(formData)
                .then((result: any) => {
                  //this.submitted = false;
                  this.interactionService.closeToast();
                  if (result && result) {
                    this.interactionService.alertMsg('SUCCESS', 'Image Updated Successfully', 'success');
                  }
                })
                .catch((err) => {
                  //this.submitted = false;
                  this.interactionService.closeToast();
                  this.interactionService.alertMsg('ERROR', err.errmsg, 'error');
                })
          }
          else if (result && result.status == false) {
            this.interactionService.alertMsg('CANCELED', 'OPERATION CANCELED', 'warning');
          }
        })

    }
  }**/

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
    callUpdateLink(this.matDialog,product);
  }

  ngOnDestroy(): void {
    this.productService.onDestroy();
  }



}
