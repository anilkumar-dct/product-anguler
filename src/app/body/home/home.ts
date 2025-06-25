import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../httpServices/http-service';
export interface Product {
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
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  displayedProducts: Product[] = [];
  loading = false;
  limit = 10;
  skip = 0;
  hasMore = true;

  private httpService = inject(HttpService);

  ngOnInit() {
    this.loadMore(); // Load first batch
    window.addEventListener('scroll', this.onScroll, true);
  }

  loadMore() {
    if (this.loading || !this.hasMore) return;

    this.loading = true;
    const url = `?limit=${this.limit}&skip=${this.skip}&select=title,price,thumbnail,discountPercentage`;

    this.httpService.getAllProducts(url).subscribe((res) => {
      this.displayedProducts.push(...res.products);
      this.skip += this.limit;
      this.hasMore = this.skip < res.total;
      this.loading = false;
    });
  }

  onScroll = () => {
    const scrollBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (scrollBottom) {
      this.loadMore();
    }
  };

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll, true);
  }
}
