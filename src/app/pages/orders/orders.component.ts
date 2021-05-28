import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'app/interface/order';
import { InteractionService } from 'app/services/interaction.service';
import { OrdersService } from 'app/services/orders.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { callFilter, callUpdateLink } from 'app/functions/openDialog';
import { ProductsService } from 'app/services/products.service';
import { Product } from 'app/interface/product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class OrdersComponent implements OnInit, OnDestroy {

  orders: Order[];
  currentPage: number;
  state: string[];
  searchedOrder: Order[];
  sortOption: string = 'datedesc';
  filterOptions: { priceHigh: number, priceMin: number, dateCreateMAx: string, dateCreateMin: string, quantityMax: number, quantityMin: number } = { dateCreateMAx: new Date().toISOString(), dateCreateMin: new Date().toISOString(), priceHigh: 100000, priceMin: 0, quantityMax: 1000, quantityMin: 1 };
  constructor(private orderService: OrdersService,
    private interactionService: InteractionService,
    private activeRouter: ActivatedRoute,
    private productService: ProductsService,
    private matDialog: MatDialog) { }


  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe((params) => {
      const page = params.page ? Number(params.page) : 1;
      this.getOrders(page);
    })
  }

  getOrders(page: number) {
    if (!this.currentPage || (this.currentPage && this.currentPage != page)) {
      this.currentPage = page;
      this.interactionService.createLoading('Getting Your Orders');
      this.orderService.getOrders(page)
        .then((result: any) => {
          this.interactionService.closeToast();
          if (result && result != false) {
            this.orders = result;
            this.searchedOrder = result;
            this.interactionService.displayToast('Orders Loaded Succesfully', false, 'success');
            this.state = new Array(this.orders.length).fill('collapsed');
          }
          else {
            this.interactionService.displayToast('Somethin Went Wrong !', false, 'error');
          }
        })
        .catch(err => {
          this.interactionService.closeToast();
          if (err && err.errmsg) {
            this.interactionService.displayToast(err.errmsg, false, 'error');
          }
          else {
            this.interactionService.displayToast('Somethin Went Wrong !', false, 'error');
          }
        })
    }

  }

  ngOnDestroy(): void {
    this.interactionService.closeToast();
    this.orderService.destroyBotSub();
    this.orderService.onDestroy();
    this.productService.onDestroyUpdate();
    this.productService.onDestroy();
  }


  toggle(index: number): void {
    const colapsedIndex = this.state.indexOf('expanded');
    colapsedIndex != -1 ? this.state[colapsedIndex] = 'collapsed' : '';
    console.log(index, colapsedIndex);
    this.state[index] = this.state[index] === 'collapsed' && index != colapsedIndex ? 'expanded' : 'collapsed';
  }

  search(event: Event) {
    if (this.orders && this.searchedOrder) {
      const filterValue = (event.target as HTMLInputElement).value;
      console.log(JSON.stringify(this.orders[0]));
      this.searchedOrder = this.orders.filter(order => JSON.stringify(order).toLowerCase().includes(filterValue.trim().toLowerCase()));
    }
  }


  sortMethod() {
    if (this.searchedOrder && this.searchedOrder.length > 0) {
      if (this.sortOption == 'dateasc') {
        this.sortByDateAsc();
      }
      else if (this.sortOption == 'datedesc') {
        this.sortByDateDesc();
      }
      else if (this.sortOption == 'pricehigh') {
        this.sortByPriceLowToHigh();

      }
      else if (this.sortOption == 'pricelow') {
        this.sortByPriceHighestToLow();
      }
    }
  }


  sortByDateAsc() {
    this.searchedOrder.sort((a, b) => a.orderPlacedDateTime.localeCompare(b.orderPlacedDateTime))
  }

  sortByDateDesc() {
    this.searchedOrder.sort((a, b) => a.orderPlacedDateTime.localeCompare(b.orderPlacedDateTime))
  }
  sortByPriceHighestToLow() {
    this.searchedOrder.sort((a, b) => (a.orderDetail.orderItems[0].unitPrice * a.orderDetail.orderItems[0].quantity) - (b.orderDetail.orderItems[0].unitPrice * b.orderDetail.orderItems[0].quantity))
  }
  sortByPriceLowToHigh() {
    this.searchedOrder.sort((a, b) => (b.orderDetail.orderItems[0].unitPrice * b.orderDetail.orderItems[0].quantity) - (a.orderDetail.orderItems[0].unitPrice * a.orderDetail.orderItems[0].quantity))
  }

  callFilterOrderComponent() {
    const filterDialog = callFilter(this.matDialog, this.filterOptions);
    filterDialog.afterClosed().subscribe(result => {
      if (result && result != null) {
        this.filterOptions = result;
        this.applyFilter();
      }

    })
  }

  applyFilter() {
    this.searchedOrder = this.orders.filter(
      order =>
        (order.orderDetail.orderItems[0].unitPrice <= this.filterOptions.priceHigh && order.orderDetail.orderItems[0].quantity <= this.filterOptions.quantityMax && this.filterOptions.dateCreateMAx.localeCompare(order.orderPlacedDateTime) >= 1)
        && (order.orderDetail.orderItems[0].unitPrice >= this.filterOptions.priceMin && order.orderDetail.orderItems[0].quantity >= this.filterOptions.quantityMin && order.orderPlacedDateTime.localeCompare(this.filterOptions.dateCreateMin) >= 1))
    console.log(this.searchedOrder);
  }

  createOrder(order: Order) {
    this.productService.getProduct(order.orderDetail.orderItems[0].product.ean)
      .then((product: Product[]) => {
        console.log(product);
        if (product && product.length > 0) {
          if (product[0].productLinkPhilips != '') {
            this.callBot(order, product[0]);
          }
          else {
            this.updateCall(product[0], order);
          }
        }
      })
  }

  updateCall(product: Product, order: Order) {
    const dialog = callUpdateLink(this.matDialog, product)
    dialog.afterClosed().subscribe((result) => {
      if (result && result.status) {
        console.log(result)
        product.productLinkPhilips = result.productNewLink;
        this.callBot(order, product);
      }
    })
  }

  callBot(order: Order, product: Product) {
    console.log(product);
    this.interactionService.confirmBox('CONFIRM', 'Call Your Bot', 'info', 'CALL BOT', "CANCEL", '')
      .then((result: any) => {
        if (result && result.status) {
          this.interactionService.displayToast('Calling Your Bot', true, 'info');
          this.orderService.callBot(order, product)
            .then((result: any) => {
              this.interactionService.closeToast();
              if (result && result != false) {
                this.interactionService.displayToast('Bot Called', false, 'success');
                window.open(product.productLinkPhilips, '_blank')
              }
              else {
                this.interactionService.displayToast('Something Went Wrong !', false, 'error');
              }
            })
            .catch(() => {
              this.interactionService.closeToast();
              this.interactionService.displayToast('Something Went Wrong !', false, 'error');
            })
        }
      })
  }









}
