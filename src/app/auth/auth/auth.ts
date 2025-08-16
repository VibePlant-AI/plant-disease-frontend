// src/app/auth/auth/auth.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class AuthComponent {
  isLoginView = true;
  loginCredentials = { username: '', password: '' };
  signupCredentials = { username: '', password: '' };
  loginError: string | null = null;
  signupError: string | null = null;
  signupSuccess: string | null = null;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleView(): void {
    this.isLoginView = !this.isLoginView;
    this.loginError = null;
    this.signupError = null;
    this.signupSuccess = null;
  }

  onLoginSubmit(): void {
    this.isLoading = true;
    this.loginError = null;
    this.authService.login(this.loginCredentials).subscribe({
      next: () => { this.router.navigate(['/home']); },
      error: (err) => {
        this.loginError = 'Invalid username or password. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onSignupSubmit(): void {
    this.isLoading = true;
    this.signupError = null;
    this.signupSuccess = null;
    this.authService.register(this.signupCredentials).subscribe({
      next: (res: any) => {
        this.signupSuccess = `${res.message} Please log in.`;
        setTimeout(() => this.toggleView(), 1500);
        this.isLoading = false;
      },
      error: (err: any) => {
        this.signupError = err.error?.error || 'Registration failed. Please try a different username.';
        this.isLoading = false;
      }
    });
  }
}