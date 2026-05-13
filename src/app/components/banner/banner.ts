import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-banner',
  imports: [ReactiveFormsModule],
  template: ` <p>banner works!</p>
  <h1>{{title()}}</h1>
  <form [formGroup]="bannerForm">
    <input type="text" formControlName="name">
  </form>
       `,
  styles: ``,
})
export class Banner {
  bannerForm =  new FormGroup({
    name: new FormControl('', [Validators.required]),
  }

  )
  readonly title =  signal('Test Tour of Heroes');

}
