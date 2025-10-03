import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventJO } from '../../_interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient)
  readonly url = 'http://127.0.0.1:8000'

  constructor() { }

    getAllItems (urlAttribute: string): Observable<EventJO[]> {
    return this.http.get<EventJO[]>(`${this.url}/${urlAttribute}/`)
  }
}
