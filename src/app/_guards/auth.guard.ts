import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/authService/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    let isauthenticated = inject(AuthService).isConnected()
    let router = inject(Router)

    if (isauthenticated) {
      return true;
    }
    router.navigate(['/login']);
    return false;
    
};
