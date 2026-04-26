import { UpperCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

export interface Hero  {
  id: number,
  name: string,
}

@Component({
  selector: 'app-hero-dashboard',
  imports: [UpperCasePipe],
  template: `  <button type="button" (click)="click()" class="hero">
      {{ hero().name | uppercase }}
    </button> `,
  styles: ``,
})
export class HeroDashboard {
  hero = input.required<Hero>();
  selected = output<Hero>();

  click() {
      this.selected.emit(this.hero());
  }

}
