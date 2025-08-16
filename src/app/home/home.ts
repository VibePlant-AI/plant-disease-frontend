import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for *ngIf
import { ApiService } from '../services/api'; // Import your ApiService

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  selectedFile: File | null = null;
  result: any = null;
  errorMessage: string | null = null;
  isLoading = false;

  constructor(private apiService: ApiService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  onSubmit(): void {
    if (!this.selectedFile) return;

    this.isLoading = true;
    this.result = null;
    this.errorMessage = null;

    this.apiService.predict(this.selectedFile).subscribe({
      next: (response) => {
        this.result = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.error || 'An unexpected error occurred. Please try again.';
        this.isLoading = false;
      }
    });
  }
}