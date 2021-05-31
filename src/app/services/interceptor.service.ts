import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private inj: Injector,
              private storageService: StorageService) {
              }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.storageService.getToken();
    let authReq;
    if (!req.url.includes('https://api.imgbb.com')){
      authReq = req.clone({ headers: req.headers.set('Authorization', 'bearer ' + authToken) });
    }
    else {
      authReq = req;
    }
    console.log(authReq)
      return next.handle(authReq);
  }
}

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private inj: Injector,
              private storageService: StorageService) {
              }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const storageService = this.inj.get(StorageService);
    const authToken = this.storageService.getToken();
    console.log(req.url);

    return next
      .handle(req)
      .pipe(tap((event: HttpEvent<any>) => {
        // do nothing
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 && authToken) {
            //authService.checkJWT(this.storageService.getCurrentHash().hashId);
          }
        }
      }));

  }
}




