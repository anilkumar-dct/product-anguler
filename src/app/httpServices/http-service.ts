import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
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
}
