import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LandingComponent } from './pages/landing/landing.component';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';

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
        path: 'login-page', 
        component: Login,
        title: 'Login Page' 
    },
    {
        path: 'cadastro-page', 
        component: Cadastro,
        title: 'Cadastro Page' 
    },
    {
        path: '**', 
        component: NotFoundComponent,
        title: 'Página Não Encontrada' 
    }
];