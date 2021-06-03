import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { generateCodeProduct } from 'app/functions/openDialog';
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
  tableDescriptionProduct : {imageSizeChartUrl:string,imageBuyUrl:string,imageColorUrl:string,mainBenifts:string,imageMainBeniftsUrl:string};
  selectedValue = 'url';
  selectOptionTableProduct = {displayMainBenifts:'none',displaySizeChart:'none',displayColor:'none',displayBuy:'none',displayMainBeniftsOption:'none',displaySizeChartOption:'none',displayColorOption:'none',displayBuyOption:'none'}
  header = new FormControl('', [Validators.required]);
  constructor(private route: ActivatedRoute,
    private productService: ProductsService,
    private storageService: StorageService,
    private imgbbService: ImgbbService,
    private interactionService: InteractionService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getCurrentProduct();
    this.getSelectOption();
  }


  getCurrentProduct() {
    this.route.params.subscribe(params => {
      this.product = this.storageService.getProduct(params['id']);
      if (this.product && this.product.description && this.product.description.length > 0) {
          this.product.description = this.product.description.sort((a,b) => a - b);
          console.log(this.product.description);
          this.product.description.map((productDescription) => {
            let formFields = productDescription;
            this.addAnotherForm(formFields);
          })
      }
      else if (this.product && (!this.product.description || (this.product.description && this.product.description.length == 0))) {
        this.initFirstForm(1);
      }

      if (this.product && this.product.tableDescription){
        this.initTableProductDescription(this.product.tableDescription);
      }
      else if (this.product && !this.product.tableDescription){
        this.initTableProductDescription();
      }
    });
  }

  openUploadFile(id,type){
    if (type == 'main'){
      $(`#option-file-input-${id}`).click();

    }
    else if (type == 'badge'){
      $(`#option-file-input-badge-${id}`).click();
    }
    else if (type == 'table-file'){
      $(`#${id}`).click();
    }
  }

  initFirstForm(formNumber: number,formField = {header:'',description:'',imageURL:'',imageBadgeURL:''}) {
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
        status: "active",
        formField:formField
      }
    ]
  }

  addAnotherForm(formField = {header:'',description:'',imageURL:'',imageBadgeURL:'',status:'active'}) {
    let lenghtFormDescriptionProduct = this.formDescriptionProduct.length + 1;
    let selectOption = {mainImageOption:formField.imageURL == '' ? 'none' : 'url',badgeImageOption:formField.imageBadgeURL == '' ? 'none' : 'url'};


    this.formDescriptionProduct.push({
      selectOption: selectOption,
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
      status: formField.status,
      formField:formField
    })
    setTimeout(() => {
      if (formField.imageURL != '') {
        console.log('here',`#option-url-${lenghtFormDescriptionProduct}`)
        $(`#option-url-${lenghtFormDescriptionProduct}`).show();
        $(`#option-url-${lenghtFormDescriptionProduct}`).fadeIn(2000);
      }
      if (formField.imageBadgeURL != '') {
        $(`#option-url-badge-${lenghtFormDescriptionProduct}`).show();
      }
    },500)
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
    this.formDescriptionProduct.map((productForm,index) => {
      if (productForm.status == 'active') {
        let initData :any = {};
        initData._id = productForm.formField._id;
        initData.position = index;
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
        if (!selecOption && productForm.formField.imageURL == '') {
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
        if (!selecOptionBadge && productForm.formField.imageBadgeURL == '') {
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
        console.log('initData',initData)
        initData.status = 'active';
        if (Object.keys(initData).length == 6){
          data.push(initData);
          this.uploadImages([initData]);
        }

      }
      else {
        let newFormProduct = {
          _id :productForm.formField._id,
          status:'deleted',
          position:index
        }
        this.saveProductDescription(newFormProduct);
      }
    })


this.submitTable();
  }

  submitTable() {
    let data : any = {};
    let numberOfDataValid = 0;
    let selectOptionMain = $(`#selectOptionMainBenifts`).text();
    if (selectOptionMain && selectOptionMain == 'Display') {
      numberOfDataValid += 2;
      let valMainBenifts = $('#mainbeniftsinput').val();
      if (valMainBenifts){
        data.valMainBenifts = valMainBenifts;
        $('#mainbeniftsinput-error').hide();
      }
      else {
        $('#mainbeniftsinput-error').show();
      }
      let selectOptionMainImage = $(`#selectOptionMainBeniftsImage`).text();
      if (selectOptionMainImage){
        $('#selectOptionMainBeniftsErrorImage').hide();
        if (selectOptionMainImage == 'Url'){
          let valUrl = $('#option-url-main-benifts-input').val();
          if (valUrl) {

            data.imageUrlMain = valUrl;
            $('#option-url-main-benifts-url').hide();
          }
          else {
            $('#option-url-main-benifts-url').show();
          }
        }
        else if (selectOptionMainImage == 'File'){
          let fileOption = $('#option-file-main-benifts-input').prop('files');
          if (fileOption && fileOption.length > 0){
            data.image = fileOption[0];

            $('#option-file-main-benifts-error').hide();
          }
          else {
            $('#option-file-main-benifts-error').show();
          }
        }
      }
      else {
        $('#selectOptionMainBeniftsErrorImage').show();
      }
    }
    else {
      numberOfDataValid = 0;
      delete data.valMainBenifts;
      delete data.image;
      delete data.imageUrlMain;
    }
    let selectOptionSizeChart = $(`#selectOptionSizeChart`).text();
    if (selectOptionSizeChart && selectOptionSizeChart == 'Display'){
      let selectionOptionSizeChartImage = $('#selectOptionSizeChartMain').text();
      numberOfDataValid += 1;
      if (selectionOptionSizeChartImage){
        $('#selectOptionSizeChartErrorImage').hide();
        if (selectionOptionSizeChartImage == 'Url') {
          let urlVal = $('#option-url-size-chart-input').val();
          if (urlVal){
            data.imageUrlSizeChart = urlVal;
            $('#option-url-size-chart-url').hide();
          }
          else {
            $('#option-url-size-chart-url').show();
          }
        }
        else if (selectionOptionSizeChartImage == 'File'){
          let fileOption = $('#option-file-size-chart-input').prop('files');
          if (fileOption && fileOption.length > 0){
            $('#option-file-size-chart-error').hide();
            data.imageSizeChart = fileOption[0];
          }
          else {
            $('#option-file-size-chart-error').show();
          }
        }
      }
      else {
        $('#selectOptionSizeChartErrorImage').show();
      }
    } else {
      delete data.imageUrlSizeChart;
      delete data.imageSizeChart;
    }

    let selectOptionBuy = $(`#selectOptionBuy`).text();
    if (selectOptionBuy && selectOptionBuy == 'Display'){
      let selectionOptionSizeChartImage = $('#selectOptionBuyMain').text();
      numberOfDataValid += 1;
      if (selectionOptionSizeChartImage){
        $('#selectBuyErrorImage').hide();
        if (selectionOptionSizeChartImage == 'Url') {
          let urlVal = $('#option-url-buy-input').val();
          if (urlVal){
            data.imageUrlBuy = urlVal;
            $('#option-url-buy-url').hide();
          }
          else {
            $('#option-url-buy-url').show();
          }
        }
        else if (selectionOptionSizeChartImage == 'File'){
          let fileOption = $('#option-file-buy-input').prop('files');
          if (fileOption && fileOption.length > 0){
            $('#option-file-buy-error').hide();
            data.imageBuy = fileOption[0];
          }
          else {
            $('#option-file-buy-error').show();
          }
        }
      }
      else {
        $('#selectBuyErrorImage').show();
      }
    } else {
      delete data.imageUrlBuy;
      delete data.imageBuy;
    }
    let selectOptionColor = $(`#selectOptionColor`).text();
    if (selectOptionColor && selectOptionColor == 'Display'){
      let selectionOptionSizeChartImage = $('#selectOptionColorMain').text();
      numberOfDataValid += 1;
      if (selectionOptionSizeChartImage){
        $('#selectColorErrorImage').hide();
        if (selectionOptionSizeChartImage == 'Url') {
          let urlVal = $('#option-url-color-input').val();
          if (urlVal){
            data.imageColorUrl = urlVal;
            $('#option-url-color-url').hide();
          }
          else {
            $('#option-url-color-url').show();
          }
        }
        else if (selectionOptionSizeChartImage == 'File'){
          let fileOption = $('#option-file-color-input').prop('files');
          if (fileOption && fileOption.length > 0){
            $('#option-file-color-error').hide();
            data.imageColor = fileOption[0];
          }
          else {
            $('#option-file-color-error').show();
          }
        }
      }
      else {
        $('#selectColorErrorImage').show();
      }
    } else {
      delete data.imageColor;
      delete data.imageColorUrl;
    }
    console.log(numberOfDataValid);
    console.log(data);
    if (Object.keys(data).length == numberOfDataValid){
      this.checkImageData(data);
    }
  }

  checkImageData(data) {
    if (data.image){
      this.uploadImagesTable(data.image,'mainBenifts',data.valMainBenifts);
    }
    else if (data.imageUrlMain) {
      let dataToSave = {mainBenifts:data.valMainBenifts,imageMainBeniftsUrl:data.imageUrlMain};
      this.saveDescriptionTableProduct(dataToSave);
    }

    if (data.imageColor) {
      this.uploadImagesTable(data.imageColor,'color');
    }
    else if (data.imageColorUrl){
      let dataToSave = {imageColorUrl:data.imageColorUrl};
      this.saveDescriptionTableProduct(dataToSave);
    }
    if (data.imageBuy) {
      this.uploadImagesTable(data.imageBuy,'buy');
    }
    else if (data.imageUrlBuy) {
      let dataToSave = {imageBuyUrl:data.imageUrlBuy};
      this.saveDescriptionTableProduct(dataToSave);
    }

    if (data.imageSizeChart) {
      this.uploadImagesTable(data.imageSizeChart,'sizechart');
    }
    else if (data.imageUrlSizeChart) {
      let dataToSave = {imageSizeChartUrl:data.imageUrlSizeChart};
      this.saveDescriptionTableProduct(dataToSave);
    }
  }

  uploadImagesTable(file,field,text = '') {
    let id = this.interactionService.displayToaster('Uploading Icon Main Benifts','loading','Upload');
    if (field == 'mainBenifts') {
      $('#option-file-main-benifts-error-upload').hide();
      $('#option-file-main-benifts-success-upload').hide();
    }
    else if (field == 'color'){
      $('#option-file-color-error-upload').hide();
      $('#option-file-color-success-upload').hide();

    }
    else if (field == 'buy'){
      $('#option-file-buy-error-upload').hide();
      $('#option-file-buy-success-upload').hide();
    }
    else if (field == 'sizechart'){
      $('#option-file-size-chart-error-upload').hide();
      $('#option-file-size-chart-success-upload').hide();
    }
    this.imgbbService.uploadImage(file)
      .then((result) => {
        this.interactionService.closeToaster(id);
        this.interactionService.displayToaster('Image Uploaded Succesfully','success','Uploaded');
        if (field == 'mainBenifts') {
          let dataToSave = {mainBenifts:text,imageMainBeniftsUrl:result};
          $('#option-file-main-benifts-success-upload').show();
          this.saveDescriptionTableProduct(dataToSave);
        }
        else if (field == 'color'){
          let dataToSave = {imageColorUrl:result};
          $('#option-file-color-success-upload').show();
          this.saveDescriptionTableProduct(dataToSave);
        }
        else if (field == 'buy'){
          let dataToSave = {imageBuyUrl:result};
          $('#option-file-buy-success-upload').show();
          this.saveDescriptionTableProduct(dataToSave);
        }
        else if (field == 'sizechart'){
          let dataToSave = {imageSizeChartUrl:result};
          $('#option-file-size-chart-success-upload').show();
          this.saveDescriptionTableProduct(dataToSave);
        }
      })
      .catch(err => {
        this.interactionService.closeToaster(id);
        if (field == 'mainBenifts') {
          $('#option-file-main-benifts-error-upload').show();
        }
        else if (field == 'color'){
          $('#option-file-color-error-upload').show();
        }
        else if (field == 'buy'){
          $('#option-file-buy-error-upload').show();
        }
        else if (field == 'sizechart'){
          $('#option-file-size-chart-error-upload').show();
        }
        this.interactionService.displayToaster('Error While Upload Image','success','ERROR');
      })
  }

  saveDescriptionTableProduct(dataToSave:any) {
    let id = this.interactionService.displayToaster('Saving Product Description Table','loading','Saving');
    this.productService.saveProductDescriptionTable(dataToSave,this.product.productId)
      .then((result) => {
        this.interactionService.closeToaster(id);
        if (result && result != false){
          this.interactionService.displayToaster('Product Description Table Saved Successfully','success','SAVED');
        }
        else {
          this.interactionService.displayToaster('Error While Saving Product Table Description','error','ERROR');
        }
      })
      .catch(err => {
        this.interactionService.closeToaster(id);
        this.interactionService.displayToaster('Error While Saving Product Table Description','error','ERROR');
      })
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
        this.interactionService.closeToaster(id);
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
    console.log(event, `#option-${event}-${id}`,id);
    if (event == 'file') {
      $(`#option-url-${id}`).hide();
    }
    else if (event == 'url') {
      $(`#option-file-${id}`).hide();

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

  initTableProductDescription(value = {imageSizeChartUrl:'',imageBuyUrl:'',imageColorUrl:'',mainBenifts:'',imageMainBeniftsUrl:''}){
    this.tableDescriptionProduct = value;
    if (this.tableDescriptionProduct.imageBuyUrl != ''){
      this.selectOptionTableProduct.displayBuy = 'display';
      this.selectOptionTableProduct.displayBuyOption = 'url';
      $('#buyHolder').show();
      $('#option-url-buy').show();
    }
    if (this.tableDescriptionProduct.imageColorUrl != ''){
      this.selectOptionTableProduct.displayColor = 'display';
      this.selectOptionTableProduct.displayColorOption = 'url';
      $('#colorHolder').show();
      $('#option-url-color').show();
    }
    if (this.tableDescriptionProduct.imageMainBeniftsUrl != ''){
      this.selectOptionTableProduct.displayMainBenifts = 'display';
      this.selectOptionTableProduct.displayMainBeniftsOption = 'url';
      $('#mainBeniftsHolder').show();
      $('#option-url-main-benifts').show();
    }
    if (this.tableDescriptionProduct.imageSizeChartUrl != '') {
      this.selectOptionTableProduct.displaySizeChart = 'display';
      this.selectOptionTableProduct.displaySizeChartOption = 'url';
      $('#sizeChartHolder').show();
      $('#option-url-size-chart').show();
    }
    console.log(this.selectOptionTableProduct);
  }



  onChangeSelectMainBeniftsImage(value) {
    if (value == 'url') {
      $(`#option-url-main-benifts`).show();
      $(`#option-file-main-benifts`).hide();
    }
    else if (value == 'file') {
      $(`#option-url-main-benifts`).hide();
      $(`#option-file-main-benifts`).show();
    }
  }

  onChangeSelectSizeChartImage(value) {
    if (value == 'url') {
      $(`#option-url-size-chart`).show();
      $(`#option-file-size-chart`).hide();
    }
    else if (value == 'file') {
      $(`#option-url-size-chart`).hide();
      $(`#option-file-size-chart`).show();
    }
  }

  onChangeSelectBuyImage(value) {
    if (value == 'url') {
      $(`#option-url-buy`).show();
      $(`#option-file-buy`).hide();
    }
    else if (value == 'file') {
      $(`#option-url-buy`).hide();
      $(`#option-file-buy`).show();
    }
  }

  onChangeSelectColorImage(value) {
    if (value == 'url') {
      $(`#option-url-color`).show();
      $(`#option-file-color`).hide();
    }
    else if (value == 'file') {
      $(`#option-url-color`).hide();
      $(`#option-file-color`).show();
    }
  }

  onChangeSelectMainBenifts(value){
    if (value == 'none') {
      $(`#mainBeniftsHolder`).hide();
    }
    else if (value == 'display') {
      $(`#mainBeniftsHolder`).show();
    }
  }

  onChangeSelectSizeChart(value){
    if (value == 'none') {
      $(`#sizeChartHolder`).hide();
    }
    else if (value == 'display') {
      $(`#sizeChartHolder`).show();
    }
  }

  onChangeSelectBuy(value){
    if (value == 'none') {
      $(`#buyHolder`).hide();
    }
    else if (value == 'display') {
      $(`#buyHolder`).show();
    }
  }

  onChangeSelectColor(value){
    if (value == 'none') {
      $(`#colorHolder`).hide();
    }
    else if (value == 'display') {
      $(`#colorHolder`).show();
    }
  }


  openDialogGenerateCode() {
    let dialogToOpen = generateCodeProduct(this.matDialog,{productId:this.product._id});
    dialogToOpen.afterClosed().subscribe(result => {
      this.getCurrentProduct()
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.formDescriptionProduct, event.previousIndex, event.currentIndex);
  }



}
