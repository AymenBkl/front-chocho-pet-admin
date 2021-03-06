import { Routes } from '@angular/router';
import { LoginComponent } from '../../pages/login/login.component';

export const LoginLayoutRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];
