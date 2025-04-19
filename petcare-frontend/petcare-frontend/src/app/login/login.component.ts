import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';  // Adjust path as necessary

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  // Predefined username and password
  predefinedUsername: string = 'admin';  // Change this to your desired username
  predefinedPassword: string = 'password123';  // Change this to your desired password

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    // Check if entered username and password match the predefined ones
    if (this.username === this.predefinedUsername && this.password === this.predefinedPassword) {
      // Normally, you'd call AuthService's login method here, but for this example, we simulate a successful login
      localStorage.setItem('token', 'dummyToken');  // Save a dummy token in localStorage
      this.authService.isLoggedInSubject.next(true);  // Update login status
      this.router.navigate(['/pets']);  // Redirect to the pets page or wherever you want
    } else {
      this.errorMessage = 'Invalid username or password!';  // Show error message if credentials are incorrect
    }
  }
}
