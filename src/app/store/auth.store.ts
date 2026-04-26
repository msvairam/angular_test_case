import { Injectable } from '@angular/core';

@Injectable()
export class AuthStore {
    public isAuthentication() {
        const token = localStorage.getItem('token');

        if (token) {
            return true;
        }
        return false;
    }
}