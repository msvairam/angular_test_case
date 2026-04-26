import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-banner',
  imports: [],
  template: ` <p>banner works!</p>
  <h1>{{title()}}</h1>
       `,
  styles: ``,
})
export class Banner {

  readonly title =  signal('Test Tour of Heroes');

}
