/*!

=========================================================
* Paper Dashboard Angular - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-angular
* Copyright 2019 Chocho Pet (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-angular/blob/master/LICENSE.md)

* Coded by Chocho Pet

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  if(window){
    window.console.log=function(){};
    window.console.error=function(){};
    window.console.warn=function(){};
    window.console.info=function(){};
    window.console.debug=function(){};
    window.console.assert=function(){};
  }
}

platformBrowserDynamic().bootstrapModule(AppModule);
