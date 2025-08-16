import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private djangoApiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  predict(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(`${this.djangoApiUrl}/predict/`, formData);
  }
}