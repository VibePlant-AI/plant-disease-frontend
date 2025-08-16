import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private djangoApiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  predict(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(`${this.djangoApiUrl}/predict/`, formData);
  }
}