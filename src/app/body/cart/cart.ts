import { Component, inject, OnInit, signal } from '@angular/core';
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

  ngOnInit() {
    this.cartItems.set(this.cart.product);
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
    this.cartItems.update((items) =>
      items.map((item) =>
        item.id === _t6.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Decrease the quantity of the given item in the cart by 1. If the quantity is 1, do nothing.
   * @param _t6 - The item to decrease the quantity of.
   */
  /*******  61691805-3fea-4ad6-9312-d5cea3065f45  *******/
  decreaseQty(_t6: Product) {
    this.cartItems.update((items) =>
      items.map((item) =>
        item.id === _t6.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }
}
