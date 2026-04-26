import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TwinQuotes {
     testQuote = 'Practice Make man Perfect';

    getQuotes() {
        return of(this.testQuote);
    }
}