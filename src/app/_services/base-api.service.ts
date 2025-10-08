import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class BaseApiService<T> {
  private http = inject(HttpClient);
  constructor(private baseUrl: string) {}

  getAll(urlAttribute: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${urlAttribute}/`);
  }

  create<T, U>(urlAttribute: string, body: U): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${urlAttribute}/`, body);
  }
}
