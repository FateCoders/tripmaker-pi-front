import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

// GUARD
import { authGuard } from './guards/auth-guard-guard';
import { roleGuard } from './guards/role-guard-guard';
import { loginGuard } from './guards/login-guard-guard';
import { canDeactivateGuard } from './guards/can-deactivate-guard-guard';

// ALL
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { TermsComponent } from './pages/terms/terms';
import { Profile } from './pages/profile/profile.component';
import { MapViewComponent } from './pages/map-view/map-view';
import { UserPermissions } from './pages/permissions/permissions';
import { FavoritesComponent } from './pages/favorities/favorities';
import { RouteSaveComponent } from './pages/route-save/route-save';
import { SelectProfile } from './pages/select-profile/select-profile';
import { RoutesChatComponent } from './pages/routes-chat/routes-chat';
import { EventDetailsComponent } from './pages/event-details/event-details';
import { DetailsComponent } from './pages/details-component/details-component';
import { PreferencesComponent } from './pages/users/traveler/preferences/preferences';

// TRAVELER
import { TravelerRoutes } from './pages/users/traveler/routes/routes';
import { TravelerEvents } from './pages/users/traveler/events/events';
import { RouteSummaryComponent } from './pages/route-summary/route-summary';
import { TravelerHome } from './pages/users/traveler/traveler-home/traveler-home';

// TOURISM PROMOTER
import { TourismPromoterHome } from './pages/users/tourism-promoter/tourism-promoter-home/tourism-promoter-home';

// ENTREPRENEUR
import { EntrepreneurHome } from './pages/users/entrepreneur/entrepreneur-home/entrepreneur-home';
import { EntrepreneurCommerce } from './pages/users/entrepreneur/entrepreneur-commerce/entrepreneur-commerce';
import { EntrepreneurNewCommerce } from './pages/users/entrepreneur/entrepreneur-new-commerce/entrepreneur-new-commerce';

// ADMIN
import { AdministratorUsers } from './pages/users/administrator/users/users';
import { AdministratorEvents } from './pages/users/administrator/events/events';
import { AdministratorCommerce } from './pages/users/administrator/commerce/commerce';
import { AdministratorUserForm } from './pages/users/administrator/user-form/user-form';
import { AdministradorNewCommerce } from './pages/users/administrator/new-commerce/new-commerce';
import { AdministratorHome } from './pages/users/administrator/administrator-home/administrator-home.component';
import { AdministratorCommerceDetail } from './pages/users/administrator/administrator-commerce-detail/administrator-commerce-detail';

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
  {
    path: 'administrador/usuarios/novo/:role',
    component: AdministratorUserForm,
    title: 'Criar Novo Usuário',
    canActivate: [authGuard, roleGuard('administrador')],
    data: { animation: 'AdminUserFormPage' },
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
    path: 'viajante/favoritos',
    component: FavoritesComponent,
    title: 'Favoritos do Viajante',
    canActivate: [authGuard, roleGuard('viajante')],
    data: { animation: 'ViajanteFavoritesPage' },
  },
  {
    path: 'viajante/permissoes',
    component: UserPermissions,
    title: 'Permissões do Viajante',
    canActivate: [authGuard, roleGuard('viajante')],
    data: { animation: 'UserPermissionsPage' },
  },
  {
    path: 'viajante/termos',
    component: TermsComponent,
    title: 'Termos do Viajante',
    canActivate: [authGuard, roleGuard('viajante')],
    data: { animation: 'UserTermsPage' },
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
  {
    path: 'empreendedor/termos',
    component: TermsComponent,
    title: 'Termos do Empreendedor',
    canActivate: [authGuard, roleGuard('empreendedor')],
    data: { animation: 'UserTermsPage' },
  },
  {
    path: 'empreendedor/permissoes',
    component: UserPermissions,
    title: 'Permissões do Empreendedor',
    canActivate: [authGuard, roleGuard('empreendedor')],
    data: { animation: 'UserPermissionsPage' },
  },

  // ROTAS DE PROMOTOR TURÍSTICO
  {
    path: 'promotor_turistico/inicio',
    component: TourismPromoterHome,
    title: 'Início do Promotor Turístico',
    canActivate: [authGuard, roleGuard('promotor_turistico')],
    data: { animation: 'PromotorTuristicoHomePage' },
  },
  {
    path: 'promotor_turistico/evento/:id',
    component: DetailsComponent,
    title: 'Detalhes do Evento',
    canActivate: [authGuard, roleGuard('promotor_turistico')],
    data: { animation: 'PromotorEventoDetalhesPage' },
  },
  {
    path: 'promotor_turistico/rota/:id',
    component: DetailsComponent,
    title: 'Detalhes do Roteiro',
    canActivate: [authGuard, roleGuard('promotor_turistico')],
    data: { animation: 'PromotorRotasDetalhesPage' },
  },
  {
    path: 'promotor_turistico/perfil',
    component: Profile,
    title: 'Perfil do Promotor Turístico',
    canActivate: [authGuard, roleGuard('promotor_turistico')],
    data: { animation: 'ProfilePage' },
  },
  {
    path: 'promotor_turistico/permissoes',
    component: UserPermissions,
    title: 'Permissões do Promotor Turístico',
    canActivate: [authGuard, roleGuard('promotor_turistico')],
    data: { animation: 'ProfilePermissionsPage' },
  },
  {
    path: 'promotor_turistico/termos',
    component: TermsComponent,
    title: 'Termos do Promotor Turístico',
    canActivate: [authGuard, roleGuard('promotor_turistico')],
    data: { animation: 'ProfileTermsPage' },
  },
  {
    path: 'promotor_turistico/mapa',
    component: MapViewComponent,
    title: 'Mapa do Promotor Turístico',
    canActivate: [authGuard, roleGuard('promotor_turistico')],
    data: { animation: 'MapPage' },
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
    data: { animation: 'AdministradorCommercePage' },
  },
  {
    path: 'administrador/comercios/detalhe/:id',
    component: AdministratorCommerceDetail,
    title: 'Detalhes do Comércio',
    canActivate: [authGuard, roleGuard('administrador')],
    data: { animation: 'AdminCommerceDetailPage' },
  },
  {
    path: 'administrador/comercios/cadastro',
    component: AdministradorNewCommerce,
    title: 'Novo Comércio do Administrador',
    canActivate: [authGuard, roleGuard('administrador')],
    data: { animation: 'AdministradorNewCommercePage' },
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
  {
    path: 'administrador/permissoes',
    component: UserPermissions,
    title: 'Permissões do Administrador',
    canActivate: [authGuard, roleGuard('administrador')],
    data: { animation: 'UserPermissionsPage' },
  },
  {
    path: 'administrador/termos',
    component: TermsComponent,
    title: 'Termos do Administrador',
    canActivate: [authGuard, roleGuard('administrador')],
    data: { animation: 'UserTermsPage' },
  },

  // PÁGINA NÃO ENCONTRADA
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Página Não Encontrada',
  },
];
