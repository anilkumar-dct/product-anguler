import { Component, input, OnInit, inject } from '@angular/core';
import { Product } from '../home';
import { HttpService } from '../../../httpServices/http-service';
@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  productId = input.required<string>();
  selectedProduct: Product | null = null;
  quantity = 1;

  private httpServices = inject(HttpService);

  ngOnInit() {
    console.log(this.productId);
    this.httpServices.getProuductById(+this.productId).subscribe((data) => {
      this.selectedProduct = data;
    });
    console.log(this.selectedProduct);
  }
  addToCart(arg0: Product, arg1: any) {
    throw new Error('Method not implemented.');
  }
  decreaseQty() {
    throw new Error('Method not implemented.');
  }
  closeModal() {
    throw new Error('Method not implemented.');
  }
}
