import { inject, Injectable, OnDestroy, signal } from '@angular/core';

import { HttpService } from '../../httpServices/http-service';
import { Product } from './home';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnDestroy {
  private httpService = inject(HttpService);
  private displayedProducts = signal<Product[]>([]); // Initialize with an empty array of product[]>([]);

  // Expose as readonly signal for consumers
  readonly allproduct = this.displayedProducts.asReadonly();

  loading = false;
  limit = 10;
  skip = 0;
  hasMore = true;

  loadMore() {
    if (this.loading || !this.hasMore) return;

    this.loading = true;
    const url = `?limit=${this.limit}&skip=${this.skip}&select=title,price,thumbnail,discountPercentage`;

    this.httpService.getAllProducts(url).subscribe((res) => {
      this.displayedProducts.update((prev) => [...prev, ...res.products]);
      this.skip += this.limit;
      this.hasMore = this.skip < res.total;
      this.loading = false;
    });
  }

  onScroll = () => {
    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (nearBottom) {
      this.loadMore();
    }
  };

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll, true);
  }
}
