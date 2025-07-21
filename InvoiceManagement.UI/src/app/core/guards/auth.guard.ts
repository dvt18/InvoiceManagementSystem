import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export function AuthGuard(requiredRoles: string[] = []): CanActivateFn {
  return () => {
    const router = inject(Router);
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      router.navigate(['/login']);
      return false;
    }

    return true;
  };
}