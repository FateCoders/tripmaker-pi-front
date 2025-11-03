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
import { TravelerPermissions } from './pages/permissions/permissions';
import { TravelerRoutes } from './pages/users/traveler/routes/routes';
import { TravelerEvents } from './pages/users/traveler/events/events';
import { PreferencesComponent } from './pages/users/traveler/preferences/preferences';
import { MapViewComponent } from './pages/map-view/map-view';
import { EventDetailsComponent } from './pages/event-details/event-details';
import { RoutesChatComponent } from './pages/routes-chat/routes-chat';
import { RouteSummaryComponent } from './pages/route-summary/route-summary';
import { RouteSaveComponent } from './pages/route-save/route-save';

import { Profile } from './pages/profile/profile.component';
import { EntrepreneurCommerce } from './pages/users/entrepreneur/entrepreneur-commerce/entrepreneur-commerce';
import { EntrepreneurNewCommerce } from './pages/users/entrepreneur/entrepreneur-new-commerce/entrepreneur-new-commerce';
import { AdministratorCommerce } from './pages/users/administrator/commerce/commerce';
import { AdministratorEvents } from './pages/users/administrator/events/events';
import { AdministratorUsers } from './pages/users/administrator/users/users';

export const routes: Routes = [
  // ROTAS GERAIS
  {
    path: '',
    component: Login,
    title: 'Página de login',
    canActivate: [loginGuard],
    data: { animation: 'LoginPage' },
  },
  {
    path: 'landing',
    component: LandingComponent,
    title: 'Página de recepção',
    canActivate: [authGuard],
    data: { animation: 'LandingPage' },
  },
  {
    path: 'profile',
    component: SelectProfile,
    title: 'Escolha um perfil',
    canActivate: [loginGuard],
    data: { animation: 'SelectProfilePage' },
  },
  {
    path: 'cadastro',
    component: Cadastro,
    title: 'Página de cadastro',
    canActivate: [loginGuard],
    canDeactivate: [canDeactivateGuard],
    data: { animation: 'CadastroPage' },
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
    component: Profile,
    title: 'Perfil do Viajante',
    canActivate: [authGuard, roleGuard('viajante')],
    data: { animation: 'ProfilePage' },
  },
  {
    path: 'viajante/permissoes',
    component: TravelerPermissions,
    title: 'Permissões do Viajante',
    canActivate: [authGuard, roleGuard('viajante')],
    data: { animation: 'ViajantePermissionsPage' },
  },
  {
    path: 'viajante/roteiros',
    component: TravelerRoutes,
    title: 'Roteiros do Viajante',
    canActivate: [authGuard, roleGuard('viajante')],
    data: { animation: 'ViajanteRoutesPage' },
  },
  {
    path: 'viajante/roteiros/chat',
    component: RoutesChatComponent,
    title: 'Crie seu Roteiro',
    canActivate: [authGuard, roleGuard('viajante')],
    data: { animation: 'ViajanteRoutesChatPage' },
  },
  {
    path: 'viajante/roteiros/resumo',
    component: RouteSummaryComponent,
    title: 'Resumo do Roteiro',
    canActivate: [authGuard, roleGuard('viajante')],
    data: { animation: 'ViajanteResumoPage' },
  },
  {
    path: 'viajante/roteiros/salvar',
    component: RouteSaveComponent,
    title: 'Salvar Roteiro',
    canActivate: [authGuard, roleGuard('viajante')],
    data: { animation: 'ViajanteSalvarPage' },
  },
  {
    path: 'viajante/eventos',
    component: TravelerEvents,
    title: 'Eventos do Viajante',
    canActivate: [authGuard, roleGuard('viajante')],
    data: { animation: 'ViajanteEventsPage' },
  },
  {
    path: 'viajante/preferences',
    component: PreferencesComponent,
    title: 'Página de Preferências',
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
    data: { animation: 'EmpreendedorHomePage' },
  },
  {
    path: 'empreendedor/comercios',
    component: EntrepreneurCommerce,
    title: 'Meus Comércios',
    canActivate: [authGuard, roleGuard('empreendedor')],
    data: { animation: 'EmpreendedorComerciosPage' },
  },
  {
    path: 'empreendedor/comercios/cadastro',
    component: EntrepreneurNewCommerce,
    title: 'Cadastrar Comércio',
    canActivate: [authGuard, roleGuard('empreendedor')],
    data: { animation: 'EmpreendedorNewCommercePage' },
  },
  {
    path: 'empreendedor/perfil',
    component: Profile,
    title: 'Perfil do Empreendedor',
    canActivate: [authGuard, roleGuard('empreendedor')],
    data: { animation: 'ProfilePage' },
  },

  // ROTAS DE PROMOTOR TURÍSTICO
  {
    path: 'promotor-turistico/inicio',
    component: TourismPromoterHome,
    title: 'Início do Promotor Turístico',
    canActivate: [authGuard, roleGuard('promotor-turistico')],
    data: { animation: 'PromotorTuristicoHomePage' },
  },
  {
    path: 'promotor-turistico/perfil',
    component: Profile,
    title: 'Perfil do Promotor Turístico',
    canActivate: [authGuard, roleGuard('promotor-turistico')],
    data: { animation: 'ProfilePage' },
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
    data: { animation: 'AdministradorHomePage' },
  },
  {
    path: 'administrador/comercios',
    component: AdministratorCommerce,
    title: 'Comércios do Administrador',
    canActivate: [authGuard, roleGuard('administrador')],
    data: { animation: 'AdministradorHomePage' },
  },
  {
    path: 'administrador/eventos',
    component: AdministratorEvents,
    title: 'Eventos do Administrador',
    canActivate: [authGuard, roleGuard('administrador')],
    data: { animation: 'AdministradorEventsPage' },
  },
  {
    path: 'administrador/usuarios',
    component: AdministratorUsers,
    title: 'Usuários do Administrador',
    canActivate: [authGuard, roleGuard('administrador')],
    data: { animation: 'AdministradorUsersPage' },
  },
  {
    path: 'administrador/perfil',
    component: Profile,
    title: 'Perfil do Administrador',
    canActivate: [authGuard, roleGuard('administrador')],
    data: { animation: 'ProfilePage' },
  },

  // PÁGINA NÃO ENCONTRADA
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Página Não Encontrada',
  },
];
