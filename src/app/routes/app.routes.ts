import { Routes } from '@angular/router';
import { AuthGuard } from '../body/login-setup/auth-gurad';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../body/login-setup/login/login').then((m) => m.Login),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('../body/login-setup/sign-up/sign-up').then((m) => m.SignUp),
  },

  {
    path: 'home',
    loadComponent: () => import('../body/home/home').then((m) => m.Home),
    canActivate: [AuthGuard],
  },
  {
    path: 'product-details/:productId',
    loadComponent: () =>
      import('../body/home/product-details/product-details').then(
        (m) => m.ProductDetails
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('../body/check-out/check-out').then((m) => m.CheckOut),
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    loadComponent: () => import('../body/cart/cart').then((m) => m.Cart),
    canActivate: [AuthGuard],
  },
];
