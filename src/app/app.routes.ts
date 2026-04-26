import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'about',
        loadComponent : () => import('./components/about/about').then((m) => m.About),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/main-dashboard/main-dashboard').then((m) => m.MainDashboard),
    }
];
