import { inject, Injectable } from '@angular/core';
import { AuthService } from '../authService/auth.service';
import { UserPublic } from '../../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  authservice = inject(AuthService);

  constructor() { }

  get user(): UserPublic | null {
  return this.authservice.currentUser();
}

  userRole(): string[] {
    return this.user?.roles ?? [];
  }

  hasRole(role: string): boolean {
    const roles = this.userRole();
    return roles.includes(role);
  }
}
