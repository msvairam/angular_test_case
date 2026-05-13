import { ComponentFixture, TestBed} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { About } from './about';
import { TwinQuotes } from '../../services/twin-quotes';
import { Observable, of } from 'rxjs';

class TwinQuotesSub implements TwinQuotes {
 testQuote = 'Test Quotes';
  getQuotes(): Observable<string> {
      return of(this.testQuote);
  }
}

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
      providers: [{ provide: TwinQuotes, useClass: TwinQuotesSub }],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    el = fixture.nativeElement.querySelector('.twain');

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('show quotes after getQuotes (success)', async () => {
      expect(el.textContent).toContain('');

     // const button = fixture.nativeElement.querySelector('button');
      const button1 = fixture.debugElement.query(By.css('.next-quotes'));

      vi.useFakeTimers();

      // button.dispatchEvent(new Event('click'));
      button1.triggerEventHandler('click');
      await vi.runAllTimersAsync();

       expect(el.textContent).toContain('Test Quotes');
       vi.useRealTimers();

  });

});
