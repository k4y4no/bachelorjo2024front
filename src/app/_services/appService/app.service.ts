import { inject, Injectable } from '@angular/core';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  authservice = inject(AuthService);

  constructor() { }

  userRole(): string[] {
    const user = this.authservice.currentUser();
    return user?.role ?? [];
  }

  hasRole(role: string): boolean {
    const roles = this.userRole();
    return roles.includes(role);
  }
}
