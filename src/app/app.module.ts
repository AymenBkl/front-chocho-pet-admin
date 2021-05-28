import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './layouts/login/login.component';
import { AuthService } from './services/auth.service';
import { StorageService } from "./services/storage.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { InterceptorService, UnauthorizedInterceptor } from "./services/interceptor.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { InteractionService } from "./services/interaction.service";
import { HttpErrorHandlerService } from "./services/http-error-handler.service";
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatIconModule } from "@angular/material/icon";
import { OrdersService } from "./services/orders.service";
import { ProductsService } from "./services/products.service";
import { LogsServiceService } from "./services/logs-service.service";
import { SubscribersComponent } from './pages/subscribers/subscribers.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    SubscribersComponent,
    ContactsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    HttpClientModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    MatSnackBarModule,
    NgxSkeletonLoaderModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      tapToDismiss: true,
      easing: 'ease-in',
      positionClass: 'toast-bottom-left',
      enableHtml: true
    }),
    FontAwesomeModule
  ],
  providers: [
    AuthService,
    StorageService,
    AuthGuardService,
    InteractionService,
    HttpErrorHandlerService,
    OrdersService,
    ProductsService,
    LogsServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,

    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
