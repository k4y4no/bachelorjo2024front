import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Token } from '../../_interfaces/token';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private http = inject(HttpClient);
    private authUrl: string = environment.authUrl

  constructor() {}

    login(credentials: { email: string; password: string }): Observable<Token> {
    return this.http.post<Token>(`${this.authUrl}`, credentials).pipe(
      tap((response: Token )=> localStorage.setItem('token', JSON.stringify( response)))
    );
  }
}
