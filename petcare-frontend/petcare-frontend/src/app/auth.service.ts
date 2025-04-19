import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; 
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private apiUrl = 'http://localhost:8080/api/auth/login'; 

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  // Login method
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      // Assuming your API returns a token after a successful login
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          // Only set token in localStorage on the client-side (browser)
          localStorage.setItem('token', response.token);
          this.isLoggedInSubject.next(true);  // Update login status
        }
      })
    );
  }

  // Check if the user is logged in (only on the browser side)
  checkLoginStatus(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') !== null; // Check if token exists in localStorage
    }
    return false;
  }

  // Logout method
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token'); // Remove the token from localStorage
    }
    this.isLoggedInSubject.next(false); // Update login status
    this.router.navigate(['/login']); // Navigate to the login page
  }

  // Get current login status
  getLoginStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  // Getter to access current login state directly
  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}
