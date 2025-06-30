import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './sign-up/auth-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('token'); // Or use your own logic

    if (!isLoggedIn) {
      if (this.authService.isLoggedIn()) {
        return true;
      }
      alert('You must log in first to access this page!');

      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
