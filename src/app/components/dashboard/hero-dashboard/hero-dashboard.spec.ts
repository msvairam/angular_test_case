import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDashboard, Hero } from './hero-dashboard';
import { DebugElement, inputBinding } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroDashboard', () => {
  let component: HeroDashboard;
  let fixture: ComponentFixture<HeroDashboard>;
  let expectedHero = {
    id: 12,
    name: 'john',
  };
  let heroEl: HTMLElement;
  let heroDe: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDashboard, {
      bindings: [
        inputBinding('hero', () => expectedHero)
      ]
    });
    component = fixture.componentInstance;

   // fixture.componentRef.setInput('hero', expectedHero);

    heroEl = fixture.nativeElement.querySelector('.hero');
    heroDe = fixture.debugElement.query(By.css('.hero'));
    await fixture.whenStable();
  });

  it ('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should be hero update in template', () => {
      const expctedVal = expectedHero.name.toUpperCase();

      expect(heroEl.textContent).toContain(expctedVal);
  });

  it ('should raise selected event when clicked (triggerEventHandler)',async () => {
      let selectedHero: Hero | undefined;
      component.selected.subscribe((hero) => selectedHero = hero);
      heroEl.dispatchEvent(new Event('click'));

      expect(selectedHero).toBe(expectedHero);

      // fixture.componentRef.setInput('hero', {...expectedHero, name: 'vairamuthu'});

      await fixture.whenStable();

  });
});
