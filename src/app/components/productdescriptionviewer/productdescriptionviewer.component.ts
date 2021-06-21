import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'app/interface/product';
import { InteractionService } from 'app/services/interaction.service';
import { ProductsService } from 'app/services/products.service';
import { StorageService } from 'app/services/storage.service';
import { Clipboard } from '@angular/cdk/clipboard';
import lozad from 'lozad'

@Component({
  selector: 'app-productdescriptionviewer',
  templateUrl: './productdescriptionviewer.component.html',
  styleUrls: ['./productdescriptionviewer.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class ProductdescriptionviewerComponent implements OnInit {
  product: Product;
  productDescriptionTotal:string;
  productDescriptionTotalToShow:string;
  segmentToShow:string = 'html';
  slideCarouselConfig = {
    "infinite": true,
    "autoplay": false,
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "pauseOnHover": true,
    "arrows": true,
    "prevArrow": '<button type="button" name="next"class="slick-prev-carousel"><img class="left_arrow" src="https://cdn.shopify.com/s/files/1/0254/2937/7112/files/Icon_feather-arrow-left-circle-1.png?v=1618817807"></button>',
    "nextArrow": '<button type="button" name="prev" class="slick-next-carousel"><img class="right_arrow" src="https://cdn.shopify.com/s/files/1/0254/2937/7112/files/Icon_feather-arrow-left-circle.png?v=1618817807"></button>',
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProductdescriptionviewerComponent>,
    private productService: ProductsService,
    private interactionService: InteractionService,
    private storageService: StorageService,
    private clipboard: Clipboard,
    private matDialog: MatDialog) { }
  ngOnInit(): void {
    const observer = lozad();
    observer.observe();
    this.getProduct();
  }

  getProduct() {
    this.interactionService.createLoading('Loading Data Please Wait !!');
    this.productService.getProduct(this.data.productId)
      .then((result: any) => {
        this.interactionService.closeToast();
        if (result && result != false) {
          this.storageService.saveProduct(result);
          this.product = result;
          this.product.description = this.product.description.sort((a,b) => a.position - b.position);
          this.productDescriptionTotal = this.buildTabs() + this.buildDescription();
          this.productDescriptionTotalToShow = this.productDescriptionTotal.split('data-src').join('src');
          this.productDescriptionTotalToShow = this.productDescriptionTotalToShow.split("src='https://cdn.shopify.com/s/files/1/0569/1175/7491/files/white-blurred-background_1034-249.jpg?v=1623593569'").join('')
          console.log(this.productDescriptionTotalToShow);
        }
        else {
          this.interactionService.closeToast();
          this.interactionService.displayToast('Something Went Wrong', false, 'Error');
        }
      })
      .catch(err => {
        this.interactionService.closeToast();
        this.interactionService.displayToast('Something Went Wrong', false, 'Error');
      })
  }

  buildTabs() {
    if (this.product && this.product.tableDescription) {
      let tabContent = `<div class="main-products-description-lg-holder">
      <div class="empty-div"></div>
      <div class="main-product-info-customized">` + this.buildListTabs() + '</div></div>';
      return tabContent;
    }
    else return '';
  }

  buildListTabs() {
    let allElemets = { listElemets: '<ul class="nav nav-tabs nav-products-holder " id="myTab" role="tablist">', contentElements: '<div class="tab-content" id="myTabContent">' };
    if (this.product && this.product.tableDescription  && (this.product.tableDescription.imageMainBeniftsUrl && this.product.tableDescription.imageMainBeniftsUrl != "''") ) {
      allElemets.listElemets += `<li class="nav-item item-holder-nav" role="presentation">
      <a class="nav-link nav-product-item" id="mainbenifit-tab" data-toggle="tab"
          href="#mainbenifit"  aria-controls="mainbenifit"
          aria-selected="false">Main Benifits </a>
  </li>`;
      allElemets.contentElements += this.buildMainBeniftsElemet(this.product.tableDescription.mainBenifts,this.product.tableDescription.imageMainBeniftsUrl);

    }

    if (this.product && this.product.tableDescription && (this.product.tableDescription.imageSizeChartUrl && this.product.tableDescription.imageSizeChartUrl != "''")){
      allElemets.listElemets += `<li class="nav-item item-holder-nav" role="presentation">
      <a class="nav-link nav-product-item" id="sizechart-tab" data-toggle="tab"
          href="#sizechart"  aria-controls="sizechart"
          aria-selected="false">Size Chart</a>
  </li>`
      allElemets.contentElements += `<div class="tab-pane fade  " id="sizechart" role="tabpanel" aria-labelledby="sizechart-tab">
      <img class="lozad"  src='https://cdn.shopify.com/s/files/1/0569/1175/7491/files/white-blurred-background_1034-249.jpg?v=1623593569' data-src="${this.product.tableDescription.imageSizeChartUrl}" alt="Size chart table is a table where you can find all the size of the product and dimesion well explained">
  </div>`;
    }

    allElemets.listElemets += `<li class="nav-item item-holder-nav" role="presentation">
    <a class="nav-link nav-product-item" id="shipping-tab"  href="#shipping" data-toggle="tab"
         aria-controls="shipping" aria-selected="false">Shipping & Returns </a>
</li>`;

    allElemets.contentElements += `<div class="tab-pane fade" id="shipping" role="tabpanel" aria-labelledby="shipping-tab">
    <p class="shiping_content">

    </p>
    <p><meta charset="utf-8"><span data-mce-fragment="1">Please be aware that your items will be delivered within <meta charset="utf-8">7-14 business days in&nbsp;<meta charset="utf-8">Europe, and up to 30-60 days outside Europe, after we process your order as all of our products are in high demand.</span><br></p>
<p><meta charset="utf-8"><span data-mce-fragment="1">If your item is in stock, please allow 2-4 business days to process your order once payment is received and cleared.</span><br></p>
<p>Once shipped, you will be emailed with a tracking number to follow your order to its destination. Please note there is no dispatch on weekends or public holidays.<br></p>
    <button class="btn btn-light" type="button" id="expandBtn" data-toggle="collapse" data-target="#moreInfo"
        aria-expanded="false" aria-controls="moreInfo" onclick="expand()">Show More</button>

    <div class="shipping_content content collapse multi-collapse" id="moreInfo">
    <p>We have a 30-day return policy, which means you have 30 days after receiving your item to request a return. <br><br>To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase. <br><br>To start a return, you can contact us at . If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted. <br><br>You can always contact us for any return question at <a href="mailto:support@chochopet.com"><span data-mce-fragment="1">support@chochopet.com</span></a>.</p>
    <br>
    <p><strong>Damages and issues</strong> <br>Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.</p>
    <br>
    <p><strong>Exchanges</strong> <br>The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.</p>
    <br>
    <p><strong>Refunds</strong> <br>We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.</p>
    </div>
</div>`;
    if (this.product && this.product.tableDescription && this.product.tableDescription.imageBuyUrl && this.product.tableDescription.imageBuyUrl != "''") {
      allElemets.listElemets += `<li class="nav-item item-holder-nav" role="presentation">
      <a class="nav-link nav-product-item" id="buymore-tab" data-bs-toggle="tab" href="#buymore" data-toggle="tab"
           aria-controls="buymore" aria-selected="false">Buy More. Save More. </a>
  </li>`;
      allElemets.contentElements += `<div class="tab-pane fade  " id="buymore" role="tabpanel" aria-labelledby="color">
      <img class="lozad" src='https://cdn.shopify.com/s/files/1/0569/1175/7491/files/white-blurred-background_1034-249.jpg?v=1623593569' data-src="${this.product.tableDescription.imageBuyUrl}" alt="Buy more and save table,which shows how you can save more money buying with us. Coupons and discount are included">
  </div>`;
    }

    if (this.product && this.product.tableDescription && this.product.tableDescription.imageColorUrl &&  this.product.tableDescription.imageColorUrl != "''") {
      allElemets.listElemets += `<li class="nav-item item-holder-nav" role="presentation">
      <a class="nav-link nav-product-item" id="color-tab" data-bs-toggle="tab" href="#color" data-toggle="tab"
           aria-controls="color" aria-selected="false">Color Chart </a>
  </li>`;
      allElemets.contentElements += `<div class="tab-pane fade " id="color" role="tabpanel" aria-labelledby="color">
      <img class="lozad" src='https://cdn.shopify.com/s/files/1/0569/1175/7491/files/white-blurred-background_1034-249.jpg?v=1623593569' data-src="${this.product.tableDescription.imageColorUrl}" alt="Table colors to demostrates further what the product colors">

  </div>`;
    }

    allElemets.listElemets += `</ul>`;
    allElemets.contentElements += '</div>';
    return allElemets.listElemets + allElemets.contentElements;
  }

  buildMainBeniftsElemet(mainBenifts:string,mainBeniftsUrl) {
    let constructedMainBeniftsList = `<div class="tab-pane fade" id="mainbenifit" role="tabpanel" aria-labelledby="mainbenifit-tab">
    <ul class="benifits-fields">`
    mainBenifts.split('#/').map(mainBeniftsElement => {
      constructedMainBeniftsList += `<li class="benifts-field">
                    <img src='https://cdn.shopify.com/s/files/1/0569/1175/7491/files/white-blurred-background_1034-249.jpg?v=1623593569' class="lozad" data-src="${mainBeniftsUrl}" alt='${mainBeniftsElement}'>

                    ${mainBeniftsElement}
                </li>`
    });
    constructedMainBeniftsList += '</ul></div>';
    return constructedMainBeniftsList;
  }

  buildDescription() {
    if (this.product && this.product.description) {
      console.log(this.product.description);
      let description = '<div class="full-description">';
      this.product.description.map((productDescription) => {
        if (productDescription.status == 'active'){
          description += `<div class="item-image-text">
          <div class="image-holder">
              <img src='https://cdn.shopify.com/s/files/1/0569/1175/7491/files/white-blurred-background_1034-249.jpg?v=1623593569' class="lozad" data-src="${productDescription.imageURL}" alt="${productDescription.header + ' .' + productDescription.description }"/>
          </div>
          <div class="text-holder">
              <img class="lozad" data-src="${productDescription.imageBadgeURL}" alt="${productDescription.header}">
              <h2 class="h3">${productDescription.header}</h2>
              <div class="content">
                  <p>${productDescription.description}</p>
              </div>
          </div>
      </div>`;
        }

      })
      description += '</div>';
      return description;
    }
    else {
      return '';
    }
  }

  copyCode() {
    this.clipboard.copy(this.productDescriptionTotal);
    $('.copied-holder').css('display','flex').hide().fadeIn(1200).fadeOut(1200);
  }

  close() {
    this.matDialog.closeAll();
  }

  switchSegments(segment:string){
    if (segment == 'code'){
      this.copyCode();
    }
    this.segmentToShow = segment;
  }
}
