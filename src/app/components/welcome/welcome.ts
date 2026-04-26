import { Component, inject, signal, computed } from '@angular/core';
import { UserAuthentication } from '../../model/user.authentication';

@Component({
  selector: 'app-welcome',
  imports: [],
  template: ` <p>welcome works!</p> 
    <p class='welcome'>{{welcome()}}</p>`,
  styles: ``,
})
export class Welcome {
  private userAuth = inject(UserAuthentication);
  readonly welcome = computed(
    () => this.userAuth.isLoggedIn() ? `Welcome, ${ this.userAuth.user().name }` : 'Please log in.',
  )
}
