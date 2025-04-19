import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';  // Import AuthService

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Fixed typo in 'styleUrls'
})
export class AppComponent {
  title = 'petcare-frontend';

  constructor(public authService: AuthService, private router: Router) {}

  // Get the current user's login status from AuthService
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  // Logout functionality
  logout(): void {
    this.authService.logout();  // Call logout method from AuthService
    this.router.navigate(['/login']);  // Redirect to login page after logging out
  }
}
