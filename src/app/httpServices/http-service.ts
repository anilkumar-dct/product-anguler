import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '../body/home/home';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = 'https://dummyjson.com/products';
  constructor(private http: HttpClient) {}
  getAllProducts(url: string): Observable<any> {
    return this.http.get(this.baseUrl + url).pipe(
      catchError((error) => {
        return error;
      })
    );
  }
  getProuductById(id: number): Observable<Product> {
    return this.http
      .get<Product>(this.baseUrl + '/' + id)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
