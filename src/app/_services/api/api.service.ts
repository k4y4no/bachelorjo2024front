import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventJO } from '../../_interfaces/event';
import { UserCreate, UserPublic } from '../../_interfaces/user';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient)
  readonly url = environment.apiUrl;

  constructor() { }

  getAllItems (urlAttribute: string): Observable<EventJO[]> {
    return this.http.get<EventJO[]>(`${this.url}/${urlAttribute}/`)
  }

  createNewItem (urlAttribute: string, body: EventJO | UserCreate): Observable<EventJO | UserPublic> {
    return this.http.post<EventJO | UserPublic>(`${this.url}/${urlAttribute}/`, body)
  }
}
