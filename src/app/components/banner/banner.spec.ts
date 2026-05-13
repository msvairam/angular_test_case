import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Banner } from './banner';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Banner', () => {
  let component: Banner;
  let fixture: ComponentFixture<Banner>;
  let h1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Banner],
    }).compileComponents();

    fixture = TestBed.createComponent(Banner);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('h1');

    await fixture.whenStable();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain banner works', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('banner works!');
  })

  it ('should contain banner text by DebugElement', () => {
    const bannerElement: DebugElement = fixture.debugElement;
    const nativeElement: HTMLElement = bannerElement.nativeElement;
    const p = nativeElement.querySelector('p');
    expect(p?.textContent).toEqual('banner works!');
  });

  it('should contain banner text by By', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const paragraphDe = bannerDe.query(By.css('p'));
    const p = paragraphDe.nativeElement;
    expect(p.textContent).toEqual('banner works!');
  })

  it('should contain banner h1 with signal', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const headerDe = bannerDe.query(By.css('h1'));
    const h = headerDe.nativeElement;
    expect(h.textContent).toEqual(component.title());
  });

  it('should banner title',async () => {
    component.title.set('Test Title');
   // await fixture.whenStable();
    fixture.detectChanges();
    expect(h1.textContent).toEqual('Test Title');
  })


  it('validate Form ',() => {
    const nameControl  = component.bannerForm.get('name');

    nameControl?.setValue('');

    fixture.detectChanges();

    const nameField = fixture.nativeElement.querySelector('input');

    expect(nameField.value).toBe('');

    expect(nameControl?.valid).toBeFalsy();
    expect(nameControl?.hasError('name')).toBeFalsy();

  })

});