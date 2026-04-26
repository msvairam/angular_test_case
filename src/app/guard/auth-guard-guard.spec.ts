import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CanActivateFn, provideRouter } from '@angular/router';

import { authGuardGuard } from './auth-guard-guard';
import { AuthStore } from '../store/auth.store';
import { Mock, Mocked } from 'vitest';
import { RouterTestingHarness } from '@angular/router/testing';

@Component({
  template: `<h1>Login Page</h1>`,
})
export class LoginPage {}

@Component({
  template: `<h1>Protected Page</h1>`,
})
export class ProtectedPage {}

describe('authGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuardGuard(...guardParameters));

  let harness: RouterTestingHarness;

  async function setup(isAuthentication: boolean) {
    const authStore = {
      isAuthentication: vi.fn().mockReturnValue(isAuthentication),
    } as Mocked<AuthStore>;

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthStore, useValue: authStore },
        provideRouter([
          {
            path: 'login',
            component: LoginPage,
          },
          {
            path: 'protected',
            component: ProtectedPage,
          },
        ]),
      ],
    });
    harness = await RouterTestingHarness.create();
  }

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('allows navigation when user is unauthenticated', async () => {
    await setup(false);

    await harness.navigateByUrl('/login', LoginPage);

    expect(harness.routeNativeElement?.textContent).toContain('Login Page');
  });

  it('allows navigation when user is authenticated', async () => {
    await setup(true);

    await harness.navigateByUrl('/protected', ProtectedPage);

    expect(harness.routeNativeElement?.textContent).toContain('Protected Page');
  })
});
