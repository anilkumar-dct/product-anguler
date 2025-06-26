import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  effect,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from './product-service';

export interface Product {
  quantity: any;
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  productService = inject(ProductService);

  loading = this.productService.loading;

  ngOnInit(): void {
    console.log('oninti');
    if (this.productService.allproduct().length === 0) {
      this.productService.loadMore();
    }

    window.addEventListener('scroll', this.productService.onScroll, true);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.productService.onScroll, true);
  }
}
