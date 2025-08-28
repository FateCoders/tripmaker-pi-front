import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
    {
        path: '', 
        component: HomeComponent,
        title: 'Página Inicial' 
    },
    {
        path: 'landing-page', 
        component: LandingComponent,
        title: 'Landing Page' 
    },
    {
        path: '**', 
        component: NotFoundComponent,
        title: 'Página Não Encontrada' 
    }
];