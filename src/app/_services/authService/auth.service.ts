import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Token } from '../../_interfaces/token';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiAuthResponse, UserPublic } from '../../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private _currentUser = signal<UserPublic | null>(null)
  currentUser = this._currentUser.asReadonly()
  isConnected = computed(() => this.currentUser() !== null)
  private authUrl: string = environment.authUrl;

  constructor() {}




  login(credentials: { email: string; password: string }): Observable<ApiAuthResponse> {
    return this.http.post<ApiAuthResponse>(`${this.authUrl}`, credentials, { withCredentials: true }
    ).pipe(
        tap((response: ApiAuthResponse) => {
            console.log('Login successful, user data:', response.user);
            this._currentUser.set(response.user);
            console.log('Current user set to:', this.currentUser());
        })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.authUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this._currentUser.set(null);
        console.log('User logged out');
      })
    );
  }

  checkAuth(): Observable<boolean> {
  return this.http.get(`${this.authUrl}/check`, { withCredentials: true }).pipe(
    map(() => true),
    catchError(() => of(false))
  );
}
}
