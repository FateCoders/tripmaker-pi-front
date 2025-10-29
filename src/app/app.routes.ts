import { Routes } from '@angular/router';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LandingComponent } from './pages/landing/landing.component';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { SelectProfile } from './pages/select-profile/select-profile';

import { loginGuard } from './guards/login-guard-guard';
import { canDeactivateGuard } from './guards/can-deactivate-guard-guard';
import { authGuard } from './guards/auth-guard-guard';
import { roleGuard } from './guards/role-guard-guard';
import { AdministratorHome } from './pages/users/administrator/administrator-home/administrator-home.component';
import { EntrepreneurHome } from './pages/users/entrepreneur/entrepreneur-home/entrepreneur-home';
import { TourismPromoterHome } from './pages/users/tourism-promoter/tourism-promoter-home/tourism-promoter-home';
import { TravelerHome } from './pages/users/traveler/traveler-home/traveler-home';
import { TravelerProfile } from './pages/users/traveler/profile/profile';
import { TravelerPermissions } from './pages/users/traveler/permissions/permissions';
import { TravelerRoutes } from './pages/users/traveler/routes/routes';
import { TravelerEvents } from './pages/users/traveler/events/events';

export const routes: Routes = [
  // ROTAS GERAIS
  {
    path: '',
    component: Login,
    title: 'Página de login',
    canActivate: [loginGuard],
  },
  {
    path: 'landing',
    component: LandingComponent,
    title: 'Página de recepção',
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: SelectProfile,
    title: 'Escolha um perfil',
    canActivate: [loginGuard],
  },
  {
    path: 'cadastro',
    component: Cadastro,
    title: 'Página de cadastro',
    canActivate: [loginGuard],
    canDeactivate: [canDeactivateGuard],
  },

  // ROTAS DE VIAJANTE
  {
    path: 'viajante/inicio',
    component: TravelerHome,
    title: 'Início do Viajante',
    canActivate: [authGuard, roleGuard('viajante')],
    data: { animation: 'ViajanteHomePage' },
  },
  {
    path: 'viajante/perfil',
    component: TravelerProfile,
    title: 'Perfil do Viajante',
    canActivate: [authGuard, roleGuard('viajante')],
    data: { animation: 'ViajanteProfilePage' },
  },
  {
    path: 'viajante/permissoes',
    component: TravelerPermissions,
    title: 'Permissões do Viajante',
    canActivate: [authGuard, roleGuard('viajante')],
  },
  {
    path: 'viajante/roteiros',
    component: TravelerRoutes,
    title: 'Routeiros do Viajante',
    canActivate: [authGuard, roleGuard('viajante')],
  },
  {
    path: 'viajante/eventos',
    component: TravelerEvents,
    title: 'Eventos do Viajante',
    canActivate: [authGuard, roleGuard('viajante')],
  },
  // ROTAS DE EMPREENDEDOR
  {
    path: 'empreendedor/inicio',
    component: EntrepreneurHome,
    title: 'Início do Empreendedor',
    canActivate: [authGuard, roleGuard('empreendedor')],
  },

  // ROTAS DE PROMOTOR TURÍSTICO
  {
    path: 'promotor-turistico/inicio',
    component: TourismPromoterHome,
    title: 'Início do Promotor Turístico',
    canActivate: [authGuard, roleGuard('promotor-turistico')],
  },

  // ROTAS DE ADMINISTRADOR
  {
    path: 'administrador/inicio',
    component: AdministratorHome,
    title: 'Início do Administrador',
    canActivate: [authGuard, roleGuard('administrador')],
  },

  // PÁGINA NÃO ENCONTRADA
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Página Não Encontrada',
  },
];
