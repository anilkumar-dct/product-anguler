import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'https://localhost:7239/api/Auth';
  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }
  signup(FullName: string, email: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, {
      FullName,
      email,
      password,
    });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }
}
