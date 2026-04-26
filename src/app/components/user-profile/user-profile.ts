import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { compatForm } from '@angular/forms/signals/compat';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [RouterLink, RouterOutlet],
  template: ` <p>user-profile works!</p> 
  <h1> User Id : {{userId()}}</h1>
  <nav>
    <a routerLink="/home">Home</a>
    <a routerLink="/about">About</a>
    <router-outlet></router-outlet>
</nav>
  `,
  styles: ``,
})
export class UserProfile {

  readonly activatedRouter =  inject(ActivatedRoute);
  readonly router = inject(Router);

  readonly userId = signal(this.activatedRouter.snapshot.params['id']);

  readonly queryParams = toSignal(this.activatedRouter.queryParams);

  searchTerm = computed(() => this.queryParams()?.['q'] || null);

}
