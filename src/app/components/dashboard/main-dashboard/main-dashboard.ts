import { Component, signal } from '@angular/core';
import { HeroDashboard } from '../hero-dashboard/hero-dashboard';

interface hero  {
  id: number,
  name: string,
}

@Component({
  selector: 'app-main-dashboard',
  imports: [HeroDashboard],
  template: ` <p>main-dashboard works!</p>
    @for (hero of heros(); track hero.id) {
      <app-hero-dashboard [hero]="hero" (selected)="gotoDetails($event)" />
    }
  `,
  styles: ``,
})
export class MainDashboard {
 heros = signal([
    {
      id: 1,
      name: 'vairamuthu'
    },
    {
      id: 2,
      name: 'miliran',
    }
 ]);

 gotoDetails(event: hero) {
    console.log(event);
 }
}
