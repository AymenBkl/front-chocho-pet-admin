import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { AuthGuardService as AuthGuard } from '../../services/auth-guard.service';
import { HashInfoComponent } from 'app/pages/hash-info/hash-info.component';
import { ComplaintsComponent } from 'app/pages/complaints/complaints.component';
import { WithdrawsComponent } from 'app/pages/withdraws/withdraws.component';
import { OrdersComponent } from 'app/pages/orders/orders.component';
import { ProductsComponent } from 'app/pages/products/products.component';
import { ApiLogsComponent } from 'app/pages/api-logs/api-logs.component';
import { LogsDetailComponent } from 'app/components/logs-detail/logs-detail.component';


export const AdminLayoutRoutes: Routes = [
  //{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'logs', component: ApiLogsComponent, canActivate: [AuthGuard] },
  { path: 'logs/:link', component: LogsDetailComponent, canActivate: [AuthGuard] },
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
