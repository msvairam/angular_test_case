import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router  = inject(Router);
  const authStore = inject(AuthStore);

  return authStore.isAuthentication() ? router.createUrlTree(['login']) : false;
};
