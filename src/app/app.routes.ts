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
import { MapViewComponent } from './pages/map-view/map-view';
import { EventDetailsComponent } from './pages/event-details/event-details';

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
  },
  {
    path: 'viajante/mapa',
    component: MapViewComponent,
    title: 'Detalhes do Evento',
  },
  {
    path: 'viajante/eventos/:id',
    component: EventDetailsComponent,
    title: 'Detalhes do Evento',
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

  {
    path: 'mapa',
    component: MapViewComponent,
    title: 'Mapa de Eventos',
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
