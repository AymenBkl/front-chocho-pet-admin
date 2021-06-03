import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule} from '@angular/material/table'
import { MatSortModule } from "@angular/material/sort";
import {  MatPaginatorModule } from '@angular/material/paginator';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HashInfoComponent } from 'app/pages/hash-info/hash-info.component';
import { DepositStatComponent } from 'app/components/deposit-stat/deposit-stat.component';
import { GameHashHistoryComponent } from 'app/components/game-hash-history/game-hash-history.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LineGraphComponent } from 'app/components/line-graph/line-graph.component';
import { CircleGraphComponent } from 'app/components/circle-graph/circle-graph.component';
import { CardStateComponent } from 'app/components/card-state/card-state.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ResetpasswordComponent } from 'app/components/resetpassword/resetpassword.component';
import { ComplaintsComponent } from 'app/pages/complaints/complaints.component';
import { ComplaintResponseComponent } from 'app/components/complaint-response/complaint-response.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { WithdrawsComponent } from 'app/pages/withdraws/withdraws.component';
import { MatChipsModule } from '@angular/material/chips';
import { FilterOrderComponent } from 'app/components/filter-order/filter-order.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProductsComponent } from 'app/pages/products/products.component';
import { UpdateLinkComponent } from 'app/components/update-link/update-link.component';
import { ApiLogsComponent } from 'app/pages/api-logs/api-logs.component';
import { LogsDetailComponent } from 'app/components/logs-detail/logs-detail.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { SubscribersComponent } from 'app/pages/subscribers/subscribers.component';
import { ContactsComponent } from 'app/pages/contacts/contacts.component';
import { ProductInfoComponent } from 'app/pages/product-info/product-info.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { ProductdescriptionviewerComponent } from 'app/components/productdescriptionviewer/productdescriptionviewer.component';
import { BestReviewsComponent } from 'app/pages/best-reviews/best-reviews.component';
import { GeneratingBestReviewsComponent } from 'app/components/generating-best-reviews/generating-best-reviews.component';
import { BestTipsComponent } from 'app/pages/best-tips/best-tips.component';
import { GenerateCodeBestTipsComponent } from 'app/components/generate-code-best-tips/generate-code-best-tips.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    NgxSkeletonLoaderModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatFileUploadModule,
    DragDropModule,
    ClipboardModule,
    SlickCarouselModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    ResetpasswordComponent,
    FilterOrderComponent,
    ProductsComponent,
    UpdateLinkComponent,
    ApiLogsComponent,
    LogsDetailComponent,
    SubscribersComponent,
    ContactsComponent,
    ComplaintResponseComponent,
    ProductInfoComponent,
    ProductdescriptionviewerComponent,
    BestReviewsComponent,
    GeneratingBestReviewsComponent,
    BestTipsComponent,
    GenerateCodeBestTipsComponent
  ]
})

export class AdminLayoutModule {}
