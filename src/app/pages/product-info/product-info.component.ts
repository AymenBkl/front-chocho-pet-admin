import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'app/interface/product';
import { ImgbbService } from 'app/services/imgbb.service';
import { InteractionService } from 'app/services/interaction.service';
import { ProductsService } from 'app/services/products.service';
import { StorageService } from 'app/services/storage.service';
import * as $ from "jquery";

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  product: Product;
  formDescriptionProduct = [];
  selectOption = [];
  header = new FormControl('', [Validators.required]);
  constructor(private route: ActivatedRoute,
    private productService: ProductsService,
    private storageService: StorageService,
    private imgbbService: ImgbbService,
    private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.getCurrentProduct();
    this.getSelectOption();
  }


  getCurrentProduct() {
    this.route.params.subscribe(params => {
      this.product = this.storageService.getProduct(params['id']);
      if (this.product && this.product.description && this.product.description.length > 0) {

      }
      else if (this.product && (!this.product.description || (this.product.description && this.product.description.length == 0))) {
        this.initFirstForm(1);
      }

    });
  }

  initFirstForm(formNumber: number) {
    this.formDescriptionProduct = [
      {
        idFields: {
          cardId: formNumber,
          selectOptionImageId: formNumber,
          'option-file': formNumber,
          'option-file-input': formNumber,
          'option-url': formNumber,
          'option-url-input': formNumber,
          'selectOptionBadgeId': 'badge-' + formNumber,
          'option-file-badge': formNumber,
          'option-file-input-badge': formNumber,
          'option-url-badge': formNumber,
          'option-url-input-badge': formNumber,
          'header': formNumber,
          'header-input': formNumber,
          'header-description': formNumber,
          'header-description-input': formNumber,
          fileImageError: formNumber,
          fileImageUrlError: formNumber,
          fileImageErrorBadge: formNumber,
          selectOptionErrorBadge: formNumber,
          fileImageUrlErrorBadge: formNumber,
          headerProductError: formNumber,
          descriptionProductError: formNumber,
          selectOptionError: formNumber,

        },
        status: "active"
      }
    ]
  }

  addAnotherForm() {
    let lenghtFormDescriptionProduct = this.formDescriptionProduct.length + 1;
    this.formDescriptionProduct.push({
      idFields: {
        cardId: lenghtFormDescriptionProduct,
        selectOptionImageId: lenghtFormDescriptionProduct,
        'option-file': lenghtFormDescriptionProduct,
        'option-file-input': lenghtFormDescriptionProduct,
        'option-url': lenghtFormDescriptionProduct,
        'option-url-input': lenghtFormDescriptionProduct,
        'selectOptionBadgeId': 'badge-' + lenghtFormDescriptionProduct,
        'option-file-badge': lenghtFormDescriptionProduct,
        'option-file-input-badge': lenghtFormDescriptionProduct,
        'option-url-badge': lenghtFormDescriptionProduct,
        'option-url-input-badge': lenghtFormDescriptionProduct,
        'header': lenghtFormDescriptionProduct,
        'header-input': lenghtFormDescriptionProduct,
        'header-description': lenghtFormDescriptionProduct,
        'header-description-input': lenghtFormDescriptionProduct,
        fileImageError: lenghtFormDescriptionProduct,
        fileImageUrlError: lenghtFormDescriptionProduct,
        fileImageErrorBadge: lenghtFormDescriptionProduct,
        selectOptionErrorBadge: lenghtFormDescriptionProduct,
        fileImageUrlErrorBadge: lenghtFormDescriptionProduct,
        headerProductError: lenghtFormDescriptionProduct,
        descriptionProductError: lenghtFormDescriptionProduct,
        selectOptionError: lenghtFormDescriptionProduct,
      },
      status: "active"

    })
  }

  deleteFormProduct(index: number) {
    this.formDescriptionProduct[index - 1].status = 'deleted';
  }

  activeFormProduct(index: number) {
    this.formDescriptionProduct[index - 1].status = 'active';
  }

  submitForms() {
    let data = [];
    let lenghtActive = this.formDescriptionProduct.filter(formProduct => formProduct.status == 'active').length;
    this.formDescriptionProduct.map(productForm => {
      if (productForm.status == 'active') {
        let initData :any = {};
        let productHeaderValue = $(`#header-input-${productForm.idFields['header-input']}`).val();
        if (!productHeaderValue) {
          $(`#headerProductError-${productForm.idFields['headerProductError']}`).show();
          delete initData.header;
        }
        else {
          $(`#headerProductError-${productForm.idFields['headerProductError']}`).hide();
          initData.header = productHeaderValue;
        }
        let descriptionProduct = $(`#header-description-input-${productForm.idFields['header-description-input']}`).val();
        if (!descriptionProduct) {
          $(`#descriptionProductError-${productForm.idFields['descriptionProductError']}`).show();
          delete initData.description;
        }
        else {
          $(`#descriptionProductError-${productForm.idFields['descriptionProductError']}`).hide();
          initData.description = descriptionProduct;
        }

        let selecOption = $(`#selectOptionImageId-${productForm.idFields['selectOptionImageId']}`).text();
        let fileOption = $(`#option-file-input-${productForm.idFields['option-file-input']}`).prop('files');
        let urlOption = $(`#option-url-input-${productForm.idFields['option-url-input']}`).val();
        console.log(fileOption.length)
        if (!selecOption) {
          $(`#selectOptionError-${productForm.idFields['selectOptionError']}`).show();
        }
        else {
          $(`#selectOptionError-${productForm.idFields['selectOptionError']}`).hide();
          if (selecOption == 'File' && !fileOption || (fileOption && fileOption.length == 0)) {
            $(`#fileImageError-${productForm.idFields['fileImageError']}`).show();
            delete initData.image;
          }
          else if (selecOption == 'File' && fileOption && fileOption.length > 0) {
            $(`#fileImageError-${productForm.idFields['fileImageError']}`).hide();
            initData.image = fileOption;
            delete initData.url;
          }
          if (selecOption == 'Url' && !urlOption) {
            $(`#fileImageUrlError-${productForm.idFields['fileImageUrlError']}`).show();
            delete initData.url;
          }
          else if (selecOption == 'Url' && urlOption) {
            $(`#fileImageUrlError-${productForm.idFields['fileImageUrlError']}`).hide();
            delete initData.image;
            initData.url = urlOption;
          }

        }

        let selecOptionBadge = $(`#selectOptionBadgeId-${productForm.idFields['selectOptionBadgeId']}`).text();
        let fileOptionBadge = $(`#option-file-input-badge-${productForm.idFields['option-file-input-badge']}`).prop('files');
        let urlOptionBadge = $(`#option-url-input-badge-${productForm.idFields['option-url-input-badge']}`).val();
        console.log(fileOptionBadge.length)
        if (!selecOptionBadge) {
          $(`#selectOptionErrorBadge-${productForm.idFields['selectOptionErrorBadge']}`).show();
        }
        else {
          $(`#selectOptionErrorBadge-${productForm.idFields['selectOptionErrorBadge']}`).hide();
          if (selecOptionBadge == 'File' && !fileOptionBadge || (fileOptionBadge && fileOptionBadge.length == 0)) {
            $(`#fileImageErrorBadge-${productForm.idFields['fileImageErrorBadge']}`).show();
            delete initData.imageBadge;
          }
          else if (selecOptionBadge == 'File' && fileOptionBadge && fileOptionBadge.length > 0) {
            $(`#fileImageErrorBadge-${productForm.idFields['fileImageErrorBadge']}`).hide();
            initData.imageBadge = fileOptionBadge;
            delete initData.urlBadge;
          }
          if (selecOptionBadge == 'Url' && !urlOptionBadge) {
            $(`#fileImageUrlErrorBadge-${productForm.idFields['fileImageUrlErrorBadge']}`).show();
            delete initData.urlBadge;
          }
          else if (selecOptionBadge == 'Url' && urlOptionBadge) {
            $(`#fileImageUrlErrorBadge-${productForm.idFields['fileImageUrlErrorBadge']}`).hide();
            initData.urlBadge = urlOptionBadge;
            delete initData.imageBadge;
          }

        }
        console.log(initData)
        if (Object.keys(initData).length == 4){
          data.push(initData);
        }

      }
    })
    console.log(data.length);
    if (lenghtActive == data.length){
      this.uploadImages(data);
    }

  }

  uploadImages(productsDescription){
    productsDescription.map((productDescription) => {
      if (productDescription.image){
        let id = this.interactionService.displayToaster('Uploading Image','loading','Upload');
        this.imgbbService.uploadImage(productDescription.image[0])
        .then((result) => {
          productDescription.imageURL = result;
          this.interactionService.closeToaster(id);
          this.interactionService.displayToaster('Image Uploaded Successfuly','success','Uploaded');
          if (productDescription.imageBadge){
            let id = this.interactionService.displayToaster('Uploading Image Badge','loading','Upload');
            this.imgbbService.uploadImage(productDescription.imageBadge[0])
            .then((result) => {
              productDescription.imageBadgeURL = result;
              this.interactionService.closeToaster(id);
              this.interactionService.displayToaster('Image Uploaded Badge Successfuly','success','Uploaded');
              this.saveProductDescription(productDescription);
            })
            .catch((err) => {
              this.interactionService.closeToaster(id);
              this.interactionService.displayToaster('Erro Uploading Image','error','Error');
              delete productDescription.imageBadgeURL;
            })
        }
        else {
          productDescription.imageBadgeURL = productDescription.urlBadge;
          this.saveProductDescription(productDescription);
        }
        })
        .catch((err) => {
          this.interactionService.closeToaster(id);
          this.interactionService.displayToaster('Erro Uploading Image','error','Error');
          delete productDescription.imageURL;
        })
    }
    else {
      productDescription.imageURL = productDescription.url;
      if (productDescription.imageBadge){
        let id = this.interactionService.displayToaster('Uploading Image Badge','loading','Upload');
        this.imgbbService.uploadImage(productDescription.imageBadge[0])
        .then((result) => {
          productDescription.imageBadgeURL = result;
          this.interactionService.closeToaster(id);
          this.interactionService.displayToaster('Image Uploaded Badge Successfuly','success','Uploaded');
          this.saveProductDescription(productDescription);
        })
        .catch((err) => {
          this.interactionService.closeToaster(id);
          this.interactionService.displayToaster('Erro Uploading Image','error','Error');
          delete productDescription.imageBadgeURL;
        })
    }
    else {
      productDescription.imageBadgeURL = productDescription.urlBadge;
      this.saveProductDescription(productDescription);
    }
    }
  })
  }

  saveProductDescription(productDescription) {
    let id = this.interactionService.displayToaster('Saving Description','loading','Saving');
    this.productService.saveDescription(productDescription,this.product._id,this.product.productId)
      .then((result:any) => {
        this.interactionService.closeToaster(id);
        if (result && result != false){
          this.interactionService.displayToaster('Description Saved Succesfully','success','Saved');
        }
        else {
          this.interactionService.displayToaster('Something Went Wrong !','error','ERROR');
        }
      })
      .catch(err => {
        this.interactionService.displayToaster('Something Went Wrong !','error','ERROR');
      })

  }

  onChangeSelect(event, id) {
    console.log(event, id);
    if (event == 'file') {
      $(`#option-url-${id}`).hide();
    }
    else if (event == 'url') {
      $(`#option-file-${id}`).hide();

    }
    $(`#option-${event}-${id}`).fadeIn(2000);
  }

  onChangeSelectBadge(event, id) {
    console.log(event, `#option-${event}-${id}`);
    if (event == 'file') {
      $(`#option-url-badge-${id}`).hide();
    }
    else if (event == 'url') {
      $(`#option-file-badge-${id}`).hide();

    }
    $(`#option-${event}-${id}`).fadeIn(2000);
  }


  getSelectOption() {
    $(document).ready(() => {
      $('#select-product-1').on('change', function () {
        console.log($('#select-product-1').val());
      });
    })
  }


}
