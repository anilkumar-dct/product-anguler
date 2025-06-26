import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../cartService';
import { Product } from '../home/home';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private cart = inject(CartService);
  cartItems = signal<Product[]>([]);
  private syncc = effect(() => {
    this.cartItems.set(this.cart.product());
  });
  ngOnInit() {
    this.cartItems.set(this.cart.product());
  }

  getTotal(): number {
    return this.cartItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  removeItem(_t6: Product) {
    this.cartItems.update((items) =>
      items.filter((item) => item.id !== _t6.id)
    );
  }

  increaseQty(_t6: Product) {
    this.cart.product.update((items) =>
      items.map((item) =>
        item.id === _t6.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  decreaseQty(_t6: Product) {
    this.cart.product.update((items) =>
      items.map((item) =>
        item.id === _t6.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }
}
