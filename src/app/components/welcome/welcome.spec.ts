import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Welcome } from './welcome';
import { UserAuthentication } from '../../model/user.authentication';
import { inject } from 'vitest';

describe('Welcome', () => {
  let component: Welcome;
  let fixture: ComponentFixture<Welcome>;
  let el: HTMLElement;
  let userAuth: UserAuthentication;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Welcome],
    }).compileComponents();

    fixture = TestBed.createComponent(Welcome);
    component = fixture.componentInstance;
    el = fixture.nativeElement.querySelector('.welcome');

    userAuth = TestBed.inject(UserAuthentication);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should welcome the user', async () => {
    await fixture.whenStable();

    const content = el.textContent;

    expect(content,  '"Welcome ..."').toContain('Welcome');
    expect(content, "'expected name'").toContain("Test User");
  })

  it('should welcome "Buddha"',async () => {
    userAuth.user.set({
      name: 'Buddha',
    });

    await fixture.whenStable();
    fixture.detectChanges();

    expect(el.textContent, 'Not updated user').toContain('Buddha');
  });

  it('should request login if not logged in', async () => {
    const auth = fixture.debugElement.injector.get(UserAuthentication);
    auth.isLoggedIn.set(false);

    await fixture.whenStable();

    expect(el.textContent).toMatch(/log in/i);

  });

});
