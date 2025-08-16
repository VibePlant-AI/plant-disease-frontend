// src/app/app.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  // The isHomePage() method is no longer needed and has been removed.

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']); // <-- Change this to '/auth'
  }
}