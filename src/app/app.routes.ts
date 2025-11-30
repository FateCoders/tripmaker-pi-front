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
import { ForgotPassword } from './pages/forgot-password/forgot-password';
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
import { TourismPromoterMapComponent } from './pages/users/tourism-promoter/map/map';
import { PromoterEventDetails } from './pages/users/tourism-promoter/promoter-event-details/promoter-event-details';
import { PromoterNewEvent } from './pages/users/tourism-promoter/promoter-new-event/promoter-new-event';
import { PromoterNewRoute } from './pages/users/tourism-promoter/promoter-new-route/promoter-new-route';
import { Reviews } from './pages/reviews/reviews';
import { AdministratorUserDetail } from './pages/users/administrator/administrator-user-detail/administrator-user-detail';

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
    path: 'esqueci-senha/:token',
    component: ForgotPassword,
    title: 'Redefinir Senha',
    data: { animation: 'ForgotPasswordPage' },
  },
  // [ALTERAÇÃO] Rota global para Termos, acessível a todos
  {
    path: 'termos',
    component: TermsComponent,
    title: 'Termos e Condições',
    // Sem guards para permitir acesso público
    data: { animation: 'UserTermsPage' },
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
  // [REMOVIDO] Rota de termos específica do viajante
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
    component: DetailsComponent,
    title: 'Detalhes do Evento',
    canActivate: [authGuard, roleGuard('viajante')],
    data: { animation: 'ViajanteEventDetailsPage' },
  },
  {
    path: 'viajante/rotas/:id',
    component: DetailsComponent,
    title: 'Detalhes da Rota',
    canActivate: [authGuard, roleGuard('viajante')],
    data: { animation: 'ViajanteRouteDetailsPage' },
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
  // [REMOVIDO] Rota de termos específica do empreendedor
  {
    path: 'empreendedor/permissoes',
    component: UserPermissions,
    title: 'Permissões do Empreendedor',
    canActivate: [authGuard, roleGuard('empreendedor')],
    data: { animation: 'UserPermissionsPage' },
  },
  {
    path: 'empreendedor/avaliacoes/:id',
    component: Reviews,
    title: 'Avaliações do Comércio',
    canActivate: [authGuard, roleGuard('empreendedor')],
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
    component: PromoterEventDetails,
    title: 'Dashboard do Evento',
    canActivate: [authGuard, roleGuard('promotor_turistico')],
    data: { animation: 'PromotorEventoDashboardPage' },
  },
  {
    path: 'promotor_turistico/eventos/novo-evento',
    component: PromoterNewEvent,
    title: 'Criar Novo Evento',
    canActivate: [authGuard, roleGuard('promotor_turistico')],
    data: { animation: 'PromotorNewEventPage' },
  },
  {
    path: 'promotor_turistico/rota/:id',
    component: PromoterEventDetails,
    title: 'Dashboard da Rota',
    canActivate: [authGuard, roleGuard('promotor_turistico')],
    data: { animation: 'PromotorRotaDashboardPage' },
  },
  {
    path: 'promotor_turistico/rotas/nova-rota',
    component: PromoterNewRoute,
    title: 'Criar Nova Rota',
    canActivate: [authGuard, roleGuard('promotor_turistico')],
    data: { animation: 'PromotorNewRoutePage' },
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
    component: TourismPromoterMapComponent,
    title: 'Mapa do Promotor Turístico',
    canActivate: [authGuard, roleGuard('promotor_turistico')],
    data: { animation: 'MapPage' },
  },
  {
    path: 'promotor_turistico/avaliacoes/:type/:id',
    component: Reviews,
    title: 'Avaliações',
    canActivate: [authGuard, roleGuard('promotor_turistico')],
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
    path: 'administrador/usuarios/detalhe/:id',
    component: AdministratorUserDetail,
    title: 'Detalhes do Usuário',
    canActivate: [authGuard, roleGuard('administrador')],
    data: { animation: 'AdminUserDetailPage' },
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
  // [REMOVIDO] Rota de termos específica do administrador
  {
    path: 'administrador/avaliacoes/:type/:id',
    component: Reviews,
    title: 'Avaliações',
    canActivate: [authGuard, roleGuard('administrador')],
  },

  // PÁGINA NÃO ENCONTRADA
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Página Não Encontrada',
  },
];