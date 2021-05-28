import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './layouts/login/login.component'
export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: 'auth',
    component: LoginComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/login/login.module#LoginLayoutModule'
  }]},
  {
    path: '**',
    redirectTo: 'admin'
  }
]
