import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueDisplay } from './value-display';
import { inputBinding, outputBinding, signal } from '@angular/core';

describe('ValueDisplay', () => {
  let component: ValueDisplay;
  let fixture: ComponentFixture<ValueDisplay>;
  const value = signal('Test Value');
  const output = (val: string) => {
    console.log(val);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(ValueDisplay, {
      bindings: [
        inputBinding('value', value),
        outputBinding('valueChange', output),
      ]
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should content text from input', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain(value());
  });

  it('should convert hero name to Title Case', async () => {
    const hostElement = fixture.nativeElement;
    const input: HTMLInputElement = hostElement.querySelector('input')!;
    const span: HTMLElement = hostElement.querySelector('span')!;

    input.value = 'quick BROWN  fOx';

    input.dispatchEvent(new Event('input'));

    await fixture.whenStable();

    expect(span.textContent).toContain('Quick Brown  Fox');

  });

});
