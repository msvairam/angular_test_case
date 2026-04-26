import { Component, inject, signal } from '@angular/core';
import { catchError, Observable, of, startWith } from 'rxjs';
import { TwinQuotes } from '../../services/twin-quotes';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [AsyncPipe],
  template: `<p class="twain">
      <i>{{ quotes | async }}</i>
  </p>
  <button type="button" (click)="getQuotes()">Next Quotes</button>
  <p>Error: {{ errorMessage() }}</p> 
  `,
  styles: ``,
})
export class About {
  quotes !: Observable<string>;
  errorMessage = signal<string>('');
  twinQuotes = inject(TwinQuotes);

  getQuotes() {
      this.quotes = this.twinQuotes.getQuotes().pipe(
        startWith('...'),
        catchError((err) => {
            this.errorMessage.set(err.message || err.toString());
            return of('...')
        })
      );
  }

}
