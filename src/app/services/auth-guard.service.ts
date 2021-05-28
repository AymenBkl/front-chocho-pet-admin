import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService,
    private storageService: StorageService) { }

  async canActivate(): Promise<boolean> {
    const admin = this.storageService.getAdmin();
    if (admin){
      await Promise.resolve(this.authService.checkJWT(admin.username));
      if (this.authService.isAuthenticated) {
        return Promise.resolve(true);
      }
      else {
        this.router.navigate(['/auth']);
        return Promise.resolve(false);
      }
    }
    else {
      this.router.navigate(['/auth']);
      return Promise.resolve(false);
    }
  }
}
