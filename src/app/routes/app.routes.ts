import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../body/home/home').then((m) => m.Home),
  },
  {
    path: 'home',
    loadComponent: () => import('../body/home/home').then((m) => m.Home),
  },
  {
    path: 'product-details/:productId',
    loadComponent: () =>
      import('../body/home/product-details/product-details').then(
        (m) => m.ProductDetails
      ),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('../body/check-out/check-out').then((m) => m.CheckOut),
  },
  {
    path: 'cart',
    loadComponent: () => import('../body/cart/cart').then((m) => m.Cart),
  },
];
