import { Injectable, signal } from '@angular/core';
import { Product } from './body/home/home';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  product = signal<Product[]>([]);
}
