import { Component, OnInit, inject, Input, signal } from '@angular/core';
import { Product } from '../home';
import { HttpService } from '../../../httpServices/http-service';
import { Location } from '@angular/common';
import { CartService } from '../../../cartService';
import { ProductService } from '../product-service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  @Input({ required: true }) productId!: string;
  showSelectProduct: Product | null = null;
  private product = inject(ProductService);
  quantity = signal<number>(1);
  private cart = inject(CartService);
  private httpServices = inject(HttpService);
  private location = inject(Location);

  ngOnInit() {
    const id = parseInt(this.productId);
    const cached = this.product.selectedProductCache().find((p) => p.id === id);
    if (cached) {
      this.showSelectProduct = cached;
      console.log('cached');
    } else {
      this.httpServices.getProuductById(id).subscribe((data) => {
        this.showSelectProduct = data;
        this.product.selectedProductCache().push(data);
      });
    }
  }
  addToCart(arg0: Product, arg1: any) {
    const value: number = arg1(); // new quantity to add
    const currentCart = this.cart.product(); // existing cart items

    const index = currentCart.findIndex((p) => p.id === arg0.id);
    let updatedCart: Product[];

    if (index !== -1) {
      // Product exists; add to existing quantity
      const existingProduct = currentCart[index];
      const newQuantity = (existingProduct.quantity || 0) + value;

      updatedCart = [...currentCart];
      updatedCart[index] = { ...existingProduct, quantity: newQuantity };
    } else {
      // New product to add
      updatedCart = [...currentCart, { ...arg0, quantity: value }];
    }

    // Update cart
    this.cart.product.set(updatedCart);

    this.closeModal();
  }

  decreaseQty() {
    if (this.quantity() > 1) {
      this.quantity.update((value) => value - 1);
    }
  }
  increaseQty() {
    this.quantity.update((value) => value + 1);
  }
  closeModal() {
    this.location.back();
  }
}
