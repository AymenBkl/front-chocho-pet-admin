import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'app/interface/product';
import { InteractionService } from 'app/services/interaction.service';
import { ProductsService } from 'app/services/products.service';
import { StorageService } from 'app/services/storage.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-productdescriptionviewer',
  templateUrl: './productdescriptionviewer.component.html',
  styleUrls: ['./productdescriptionviewer.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class ProductdescriptionviewerComponent implements OnInit {
  product: Product;
  productDescriptionTotal:string;
  segmentToShow:string = 'html';
  slideCarouselConfig = {
    "infinite": true,
    "autoplay": false,
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "pauseOnHover": true,
    "arrows": true,
    "prevArrow": '<button type="button" class="slick-prev-carousel"><img class="left_arrow" src="https://cdn.shopify.com/s/files/1/0254/2937/7112/files/Icon_feather-arrow-left-circle-1.png?v=1618817807"></button>',
    "nextArrow": '<button type="button" class="slick-next-carousel"><img class="right_arrow" src="https://cdn.shopify.com/s/files/1/0254/2937/7112/files/Icon_feather-arrow-left-circle.png?v=1618817807"></button>',
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProductdescriptionviewerComponent>,
    private productService: ProductsService,
    private interactionService: InteractionService,
    private storageService: StorageService,
    private clipboard: Clipboard,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
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
    if (this.product && this.product.tableDescription && this.product.tableDescription.mainBenifts != "''" && this.product.tableDescription.imageMainBeniftsUrl != "''") {
      allElemets.listElemets += `<li class="nav-item item-holder-nav" role="presentation">
      <a class="nav-link nav-product-item" id="mainbenifit-tab" data-toggle="tab"
          href="#mainbenifit"  aria-controls="mainbenifit"
          aria-selected="false">Main Benifits </a>
  </li>`;
      allElemets.contentElements += this.buildMainBeniftsElemet(this.product.tableDescription.mainBenifts,this.product.tableDescription.imageMainBeniftsUrl);

    }

    if (this.product && this.product.tableDescription && this.product.tableDescription.imageSizeChartUrl != "''"){
      allElemets.listElemets += `<li class="nav-item item-holder-nav" role="presentation">
      <a class="nav-link nav-product-item" id="sizechart-tab" data-toggle="tab"
          href="#sizechart"  aria-controls="sizechart"
          aria-selected="false">Size Chart</a>
  </li>`
      allElemets.contentElements += `<div class="tab-pane fade  " id="sizechart" role="tabpanel" aria-labelledby="sizechart-tab">
      <img src="${this.product.tableDescription.imageSizeChartUrl}">
  </div>`;
    }

    allElemets.listElemets += `<li class="nav-item item-holder-nav" role="presentation">
    <a class="nav-link nav-product-item" id="shipping-tab"  href="#shipping" data-toggle="tab"
         aria-controls="shipping" aria-selected="false">Shipping & Returns </a>
</li>`;

    allElemets.contentElements += `<div class="tab-pane fade" id="shipping" role="tabpanel" aria-labelledby="shipping-tab">
    <p class="shiping_content">

    </p>
    <p class="shiping_content"><b>IS SHIPPING FREE?</b></p>
    <p class="shiping_content">Shipping is free For Europ on ALL PRODUCTS!</p>
    <p class="shiping_content"><b>WHEN WILL I RECEIVE MY ORDER?</b></p>
    <p class="shiping_content">Orders are shipped out directly from any of our many domestic &amp; international
        warehouses and they
        will do everything they can to get you your order as fast as they can! Please allow 1-3 Business Days
        for your order to be shipped (with up to 6 business days at peak times). Due to the popularity of our
        offers&nbsp;the average Standard Delivery Time is<span>&nbsp;</span><strong>10&nbsp;- 23 business
            days</strong><span>&nbsp;</span>(for most Europe). Christmas season is the busiest time of the year,
        therefore, delivery time frames may increase up to 30 calendar days. Other countries can take an
        estimated 1-6 weeks (varies from product to product) due to distance traveling and customs. Please note,
        that due to the extreme popularity of our offers, these are only estimates.</p>
    <p class="shiping_content"></p>
    <button class="btn btn-light" type="button" id="expandBtn" data-toggle="collapse" data-target="#moreInfo"
        aria-expanded="false" aria-controls="moreInfo" onclick="expand()">Show More</button>

    <div class="shipping_content content collapse multi-collapse" id="moreInfo">
        <p class="shiping_content">
        </p>
        <p class="shiping_content"><b>WHY IS MY ORDER BEING SHIPPED IN DIFFERENT PACKAGES?</b></p>
        <p class="shiping_content">If you have a multi-item order, each item may be shipped from a different
            international warehouse,
            depending on which one has them available the fastest. Alternatively, if an item is popular and on a
            bit of a back order, we might ship your items at different times, in different packages, to prevent
            holding up your order and to get it to you as fast as possible!</p>
        <p class="shiping_content"><b>WHAT HAPPENS IF MY ORDER GETS STUCK OR LOST IN THE MAIL?</b></p>
        <p class="shiping_content">All of our orders are sent with insured shipping and handling. If an order
            gets stuck at customs,
            sent back or even lost during the delivery process, we apologize! The postal service is out of our
            control. However, in cases like this, because the packages are insured, we will send you a new
            package with quicker shipping and full tracking, if possible. Please see our refund and return
            policy for when these might be applicable to shipping situations.</p>
        <p class="shiping_content"><b>WILL I BE CHARGED FOR CUSTOMS AND TAXES?</b></p>
        <p class="shiping_content">The prices displayed on our site are tax-free. Import taxes, duties and
            related customs fees may be
            charged once your order arrives to its final destination, which are determined by your local customs
            office. Payment of these charges and taxes are your responsibility and will not be covered by us. We
            are not responsible for delays caused by the customs department in your country. For further details
            of charges, please contact your local customs office.<span>&nbsp;</span><b>Usually, there are no
                custom or tax charges, however, there are always rare exceptions.</b></p>
        <p class="shiping_content"></p>
    </div>
</div>`;
    if (this.product && this.product.tableDescription && this.product.tableDescription.imageBuyUrl != "''") {
      allElemets.listElemets += `<li class="nav-item item-holder-nav" role="presentation">
      <a class="nav-link nav-product-item" id="buymore-tab" data-bs-toggle="tab" href="#buymore" data-toggle="tab"
           aria-controls="buymore" aria-selected="false">Buy More. Save More. </a>
  </li>`;
      allElemets.contentElements += `<div class="tab-pane fade  " id="buymore" role="tabpanel" aria-labelledby="color">
      <img class=" " src="${this.product.tableDescription.imageBuyUrl}">
  </div>`;
    }

    if (this.product && this.product.tableDescription && this.product.tableDescription.imageColorUrl != "''") {
      allElemets.listElemets += `<li class="nav-item item-holder-nav" role="presentation">
      <a class="nav-link nav-product-item" id="color-tab" data-bs-toggle="tab" href="#color" data-toggle="tab"
           aria-controls="color" aria-selected="false">Color Chart </a>
  </li>`;
      allElemets.contentElements += `<div class="tab-pane fade " id="color" role="tabpanel" aria-labelledby="color">
      <img src="${this.product.tableDescription.imageColorUrl}">

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
                    <img src="${mainBeniftsUrl}">

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
              <img src="${productDescription.imageURL}" />
          </div>
          <div class="text-holder">
              <img src="${productDescription.imageBadgeURL}">
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
