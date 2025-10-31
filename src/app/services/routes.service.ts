import { AuthService } from "./auth.service";
import { Injectable, inject } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private authService = inject(AuthService);

  // Dados mocados de rotas
  private allRoutes: any[] = [
    { id: '1', title: 'Rota Histórica', description: 'Descubra o centro histórico.', isActive: true, registeredUsers: [] },
    { id: '2', title: 'Rota Gastronômica', description: 'Sabores da cidade.', isActive: true, registeredUsers: [] },
    { id: '3', title: 'Rota da Natureza', description: 'Trilhas e paisagens.', isActive: false, registeredUsers: [] },
  ];

  private readonly routes = {
    admin: [
      {path: '/administrador/inicio', label: 'Início', icon: 'home'},
      {path: '/administrador/eventos', label: 'Eventos', icon: 'event'},
      {path: '/administrador/comercios', label: 'Comércios', icon: 'store'},
      {path: '/administrador/usuarios', label: 'Usuários', icon: 'group'},
      {path: '/administrador/perfil', label: 'Perfil', icon: 'person'},
    ],
    empreendedor: [
      {path: '/empreendedor/inicio', label: 'Início', icon: 'home'},
      {path: '/empreendedor/comercios', label: 'Comércios', icon: 'store'},
      {path: '/empreendedor/perfil', label: 'Perfil', icon: 'person'},
    ],
    promotor_turistico: [
      {path: '/promotor-turistico/inicio', label: 'Início', icon: 'home'},
      {path: '/promotor-turistico/eventos', label: 'Eventos', icon: 'event'},
      {path: '/promotor-turistico/mapa', label: 'Mapa', icon: 'map'},
      {path: '/promotor-turistico/perfil', label: 'Perfil', icon: 'person'},
    ],
    viajante: [
      {path: '/viajante/inicio', label: 'Início', icon: 'home'},
      {path: '/viajante/eventos', label: 'Eventos', icon: 'event'},
      {path: '/viajante/roteiros', label: 'Roteiros', icon: 'map'},
      {path: '/viajante/perfil', label: 'Perfil', icon: 'person'},
    ]
  };

  getUserRoutes() {
    const userRole = this.authService.getUserRole();
    if (userRole === 'administrador') {
      return this.routes.admin;
    } else if (userRole === 'empreendedor') {
      return this.routes.empreendedor;
    } else if (userRole === 'promotor_turistico') {
      return this.routes.promotor_turistico;
    } else if (userRole === 'viajante') {
      return this.routes.viajante;
    }
    return [];
  }

  // Métodos para gerenciar as rotas mocadas
  getAllRoutes() {
    return this.allRoutes;
  }

  getVisibleRoutes() {
    return this.allRoutes.filter(route => route.isActive);
  }

  toggleRouteStatus(routeId: string) {
    const route = this.allRoutes.find(r => r.id === routeId);
    if (route) {
      route.isActive = !route.isActive;
    }
  }

  registerUserToRoute(routeId: string): boolean {
    const route = this.allRoutes.find(r => r.id === routeId);
    const currentUser = this.authService.getCurrentUser();

    if (route && currentUser) {
      const userEmail = currentUser.email;
      if (!route.registeredUsers.includes(userEmail)) {
        route.registeredUsers.push(userEmail);
        console.log('Usuários na rota:', route.registeredUsers);
        return true; // Sucesso
      }
    }
    return false; // Falha ou já registrado
  }
}