// src/app/services/auth.ts

import { Injectable, Inject, PLATFORM_ID } from '@angular/core'; // <-- Import Inject, PLATFORM_ID
import { isPlatformBrowser } from '@angular/common'; // <-- Import isPlatformBrowser
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private tokenKey = 'auth_token';
  private isBrowser: boolean;

  // Inject PLATFORM_ID to know if we are on the server or browser
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  register(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, credentials);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/`, credentials).pipe(
      tap((response: any) => {
        // Only try to set the token if we are in a browser
        if (this.isBrowser) {
          localStorage.setItem(this.tokenKey, response.access);
        }
      })
    );
  }

  logout(): void {
    // Only try to remove the token if we are in a browser
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  getToken(): string | null {
    // Only try to get the token if we are in a browser
    if (this.isBrowser) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isLoggedIn(): boolean {
    // This function is now safe because getToken() is safe
    return !!this.getToken();
  }
}