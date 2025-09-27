import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LandingComponent } from './pages/landing/landing.component';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { SelectProfile } from './pages/select-profile/select-profile';
import { loginGuard } from './guards/login-guard-guard';
import { canDeactivateGuard } from './guards/can-deactivate-guard-guard';
import { authGuard } from './guards/auth-guard-guard';

export const routes: Routes = [
  {
    path: '',
    component: Login,
    title: 'Página de login',
    canActivate: [loginGuard],
  },
  {
    path: 'landing-page',
    component: LandingComponent,
    title: 'Página de recepção',
    canActivate: [authGuard],
  },
  {
    path: 'profile-page',
    component: SelectProfile,
    title: 'Escolha um perfil',
    canActivate: [loginGuard],
  },
  {
    path: 'home-viajante',
    component: HomeComponent,
    title: 'Página inicial',
    canActivate: [authGuard],
  },
  {
    path: 'cadastro-page',
    component: Cadastro,
    title: 'Página de cadastro',
    canActivate: [loginGuard],
    canDeactivate: [canDeactivateGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Página Não Encontrada',
  },
];
