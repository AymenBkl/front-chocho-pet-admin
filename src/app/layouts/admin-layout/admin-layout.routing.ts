import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { AuthGuardService as AuthGuard } from '../../services/auth-guard.service';
import { ProductsComponent } from 'app/pages/products/products.component';
import { ApiLogsComponent } from 'app/pages/api-logs/api-logs.component';
import { LogsDetailComponent } from 'app/components/logs-detail/logs-detail.component';
import { SubscribersComponent } from 'app/pages/subscribers/subscribers.component';
import { ContactsComponent } from 'app/pages/contacts/contacts.component';
import { ProductInfoComponent } from 'app/pages/product-info/product-info.component';
import { BestReviewsComponent } from 'app/pages/best-reviews/best-reviews.component';
import { BestTipsComponent } from 'app/pages/best-tips/best-tips.component';
import { BadgesComponent } from 'app/pages/badges/badges.component';


export const AdminLayoutRoutes: Routes = [
  //{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'subscribers', component: SubscribersComponent , canActivate: [AuthGuard] },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'best-reviews', component: BestReviewsComponent, canActivate: [AuthGuard] },
  { path: 'best-tips', component: BestTipsComponent, canActivate: [AuthGuard] },
  { path: 'badges', component: BadgesComponent, canActivate: [AuthGuard] },
  { path: 'product-info/:id', component: ProductInfoComponent, canActivate: [AuthGuard] },

  //{ path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  //{ path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  //{ path: 'logs', component: ApiLogsComponent, canActivate: [AuthGuard] },
  //{ path: 'logs/:link', component: LogsDetailComponent, canActivate: [AuthGuard] },
  //{ path: 'hashes', component: TableComponent, canActivate: [AuthGuard] },
  //{ path: 'typography', component: TypographyComponent, canActivate: [AuthGuard] },
  //{ path: 'icons', component: IconsComponent, canActivate: [AuthGuard] },
  //{ path: 'maps', component: MapsComponent, canActivate: [AuthGuard] },
  //{ path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
  //{ path: 'upgrade', component: UpgradeComponent, canActivate: [AuthGuard] },
  //{ path: 'info/:hashId', component: HashInfoComponent, canActivate: [AuthGuard] },
  //{ path: 'complaints', component: ComplaintsComponent, canActivate: [AuthGuard] },
  //{ path: 'withdraws', component: WithdrawsComponent, canActivate: [AuthGuard] }

];
