import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CanActivateFn, provideRouter } from '@angular/router';

import { authGuardGuard } from './auth-guard-guard';
import { AuthStore } from '../store/auth.store';
import { Mocked, test } from 'vitest';
import { RouterTestingHarness } from '@angular/router/testing';

const calculator = {
  add: (a: number, b: number) => a + b,
};

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
  });

  test('spiecs method exection', () => {
    // Create the spy
    const addSpy = vi.spyOn(calculator, 'add');

    const result = calculator.add(3, 2);

    expect(result).toBe(5);
    expect(addSpy).toHaveBeenCalled();
    expect(addSpy).toHaveBeenCalledWith(3, 2);

    // Clean up (restores original un-spied function)
    addSpy.mockRestore();
  });

  test('spies and alters behaviours', () => {
    const addSpy = vi.spyOn(calculator, 'add').mockReturnValue(100);

    expect(calculator.add(2, 4)).toBe(100); // Forces return value

    // Provide a completely fake temporary implementation
    addSpy.mockImplementation((a, b) => a * b);
    expect(calculator.add(2, 3)).toBe(6);

    expect(addSpy).toHaveBeenCalled();
    expect(addSpy).toHaveBeenCalledWith(2, 4);
  });

  test('standalone spy function', () => {
    const onClickSpy = vi.fn();

    onClickSpy('on_click');

    expect(onClickSpy).toHaveBeenCalledOnce();
    expect(onClickSpy).toHaveBeenCalledWith('on_click');

    const result = vi.fn().mockReturnValue(100);

    expect(result()).toBe(100);
  })
});
