import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (expectedRole: string): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const userRole = authService.getUserRole();

    if (authService.isLoggedIn() && userRole === expectedRole) {
      return true;
    }

    if (!authService.isLoggedIn()) {
      router.navigate(['/login']);
    } else {
      router.navigate(['/acesso-negado']);
    }

    return false;
  };
};
