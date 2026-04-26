import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class UserAuthentication {
    readonly isLoggedIn = signal(true);
    readonly user = signal({
        name: 'Test User',
    })
}