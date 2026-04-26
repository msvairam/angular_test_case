import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfile } from './user-profile';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideRouter, RouteConfigLoadStart } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { About } from '../about/about';

@Component({
  template: `<h1>Home Page</h1>`
})
export class MockHome { } 

@Component({
  template: `<h1>About Page</h1>`
})
export class MockAbout { } 

describe('user profile component', () => {
  let component: UserProfile;
  let fixture: ComponentFixture<UserProfile>;
  let hostEl: HTMLElement;
  let hostDe: DebugElement;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [UserProfile],
      providers: [
        provideRouter([
          {
            path: 'user/:id',
            component: UserProfile,
            children: [
              {
                path: 'home',
                component: MockHome,
              },
              {
                path: 'about',
                component: MockAbout,
              }
            ],
          },
        ]),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(UserProfile);
    component = fixture.componentInstance;
    harness = await RouterTestingHarness.create();

    await fixture.whenStable();

    hostEl = fixture.nativeElement.querySelector('p');
    hostDe = fixture.debugElement.query(By.css('p'));
  });

  it('should load p contianer', () => {
    expect(hostEl.textContent).toContain('user-profile works!');
    expect(hostDe.nativeElement.textContent).toContain('user-profile works');
  });

  it('should navigate to user profile', async () => {

    component = await harness.navigateByUrl('user/23?q=angular', UserProfile);

    expect(component.searchTerm()).toBe('angular');

    const el = harness.routeDebugElement?.query(By.css('h1'));

    expect(el?.nativeElement.textContent).toBe(' User Id : 23');
  });

  it('should navigate to home page', async () => {
    await harness.navigateByUrl('user/23/home');

            const el = harness.routeDebugElement?.query(By.css('h1'));

    expect(el?.nativeElement.textContent).toBe(' User Id : 23');
    expect(harness.routeDebugElement?.nativeElement.textContent).toContain('Home Page');
  });

    it('should navigate to home page', async () => {
    await harness.navigateByUrl('user/23/about');

        const el = harness.routeDebugElement?.query(By.css('h1'));

    expect(el?.nativeElement.textContent).toBe(' User Id : 23');
    expect(harness.routeDebugElement?.nativeElement.textContent).toContain('About Page');
  })
});
