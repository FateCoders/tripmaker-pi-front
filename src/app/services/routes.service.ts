// src/app/services/routes.service.ts

import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from './auth.service';
import { RouteCardItem } from '../interfaces/route-card-item';
import { isPlatformBrowser } from '@angular/common';
import { Route } from '../interfaces/routes';

const CURRENT_ROUTE_KEY = 'currentRouteItems';
const SAVED_ROUTES_KEY = 'savedRoutes';

// Helper para datas (hoje - N dias)
const dateDaysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // ... (código 'routes' do menu omitido) ...
  private readonly routes = {
    admin: [
      { path: '/administrador/inicio', label: 'Início', icon: 'home' },
      { path: '/administrador/eventos', label: 'Eventos', icon: 'event' },
      { path: '/administrador/comercios', label: 'Comércios', icon: 'store' },
      { path: '/administrador/usuarios', label: 'Usuários', icon: 'group' },
      { path: '/administrador/perfil', label: 'Perfil', icon: 'person' },
      // { path: '/administrador/eventos/nova-rota', label: 'Nova Rota', icon: 'map' },
      // { path: '/administrador/eventos/novo-evento', label: 'Novo EVento', icon: 'event' },
    ],

    empreendedor: [
      { path: '/empreendedor/inicio', label: 'Início', icon: 'home' },
      { path: '/empreendedor/comercios', label: 'Comércios', icon: 'store' },
      { path: '/empreendedor/perfil', label: 'Perfil', icon: 'person' },
    ],

    promotor_turistico: [
      {path: '/promotor_turistico/inicio', label: 'Início', icon: 'home'},
      {path: '/promotor_turistico/mapa', label: 'Mapa', icon: 'map'},
      {path: '/promotor_turistico/perfil', label: 'Perfil', icon: 'person'},
      // { path: '/promotor_turistico/eventos/nova-rota', label: 'Nova Rota', icon: 'map' },
      // { path: '/promotor_turistico/eventos/novo-evento', label: 'Novo EVento', icon: 'event' },
    ],

    viajante: [
      { path: '/viajante/inicio', label: 'Início', icon: 'home' },
      { path: '/viajante/eventos', label: 'Eventos', icon: 'event' },
      { path: '/viajante/roteiros', label: 'Roteiros', icon: 'map' },
      { path: '/viajante/perfil', label: 'Perfil', icon: 'person' },
    ],
    
  };

  private allRoutes: Route[] = [
    {
      id: '1',
      title: 'Rota Histórica (Tatuí)',
      description: 'Descubra o centro histórico.',
      isActive: true,
      registeredUsers: ['user1@test.com', 'user2@test.com', 'user3@test.com'],
      region: 'tatui',
      creationDate: dateDaysAgo(6),
    },
    {
      id: '2',
      title: 'Rota Gastronômica (Sorocaba)',
      description: 'Sabores da cidade.',
      isActive: true,
      img: 'assets/images/png/conservatorio.png',
      registeredUsers: ['user1@test.com', 'user2@test.com'],
      region: 'sorocaba',
      creationDate: dateDaysAgo(15),
    },
    {
      id: '3',
      title: 'Rota da Natureza (Campinas)',
      description: 'Trilhas e paisagens.',
      isActive: false,
      img: 'assets/images/png/conservatorio.png',
      registeredUsers: ['user4@test.com', 'user5@test.com', 'user6@test.com', 'user7@test.com'],
      region: 'campinas',
      creationDate: dateDaysAgo(50),
    },
    {
      id: '4G',
      title: 'Rota de Aventura (Tatuí)',
      description: 'Passeios radicais.',
      isActive: true,
      img: 'assets/images/png/conservatorio.png',
      registeredUsers: [
        'user8@test.com',
        'user9@test.com',
        'user10@test.com',
        'user11@test.com',
        'user12@test.com',
      ],
      region: 'tatui',
      creationDate: dateDaysAgo(80),
    },
    {
      id: '5',
      title: 'Rota do Vinho (Sorocaba)',
      description: 'Vinícolas da região.',
      isActive: true,
      img: 'assets/images/jpg/exposicao-arte.jpg',
      registeredUsers: ['user1@test.com', 'user10@test.com', 'user12@test.com'],
      region: 'sorocaba',
      creationDate: dateDaysAgo(3),
    },
  ];

  // ... (resto do service, initialMockRoutes, saveCurrentRoute, etc.) ...
  private initialMockRoutes = [
    {
      id: 'roteiro-1',
      image: 'assets/images/jpg/teatro.jpeg',
      title: 'Roteiro de 1 dia em Boituva',
      category: 'Aventura',
      rating: 4.8,
      distance: '3 eventos',
      details: 'Um dia radical com paraquedismo e balonismo.',
      items: [
        { title: 'Cachoeira do Barro Preto', category: 'Boituva-SP', image: 'assets/images/jpg/teatro.jpeg' },
        { title: 'Voo de Balão', category: 'Boituva-SP', image: 'assets/images/jpg/fundo-landing.jpg' },
        { title: 'Fazenda da Paz', category: 'Boituva-SP', image: 'assets/images/png/conservatorio.png' },
      ]
    },
    {
      id: 'roteiro-2',
      image: 'assets/images/png/conservatorio.png',
      title: 'Fim de semana em Tatuí',
      category: 'Cultural',
      rating: 4.5,
      distance: '5 eventos',
      details: 'Conheça a capital da música e seus arredores.',
      items: [
        { title: 'Conservatório de Tatuí', category: 'Tatuí-SP', image: 'assets/images/png/conservatorio.png' },
        { title: 'Museu Histórico', category: 'Tatuí-SP', image: 'assets/images/jpg/exposicao-arte.jpg' },
        { title: 'Praça da Matriz', category: 'Tatuí-SP', image: 'assets/images/jpg/teatro.jpeg' },
        { title: 'Restaurante Central', category: 'Tatuí-SP', image: 'assets/images/webp/feira-gastronomica.webp' },
      ]
    },
  ];
  
  // --- MÉTODOS DE NAVEGAÇÃO ---
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
  
  // --- MÉTODOS DE ROTEIRO (USANDO LOCALSTORAGE) ---
  saveCurrentRoute(items: RouteCardItem[]): void {
    if (this.isBrowser) {
      try {
        localStorage.setItem(CURRENT_ROUTE_KEY, JSON.stringify(items));
        console.log(`Roteiro atual salvo com ${items.length} itens.`);
      } catch (e) {
        console.error('Erro ao salvar roteiro atual no localStorage', e);
      }
    }
  }
  loadCurrentRoute(): RouteCardItem[] {
    if (this.isBrowser) {
      try {
        const saved = localStorage.getItem(CURRENT_ROUTE_KEY);
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error('Erro ao carregar roteiro atual do localStorage', e);
        return [];
      }
    }
    return [];
  }
  clearCurrentRoute(): void {
    if (this.isBrowser) {
      localStorage.removeItem(CURRENT_ROUTE_KEY);
      console.log('Roteiro atual limpo do localStorage.');
    }
  }
  saveFinalRoute(routeData: any, items: RouteCardItem[]): boolean {
    if (this.isBrowser) {
      try {
        const savedRoutes = this.getSavedRoutes().filter(r => !this.initialMockRoutes.some(mock => mock.id === r.id));
        
        const newRoute = {
          ...routeData,
          id: `roteiro-${savedRoutes.length + 1}`,
          items: items,
          date: new Date().toLocaleDateString('pt-BR'), 
          image: items[0]?.image || 'assets/images/jpg/teatro.jpeg',
          category: routeData.name || 'Personalizado',
          rating: 5.0,
          distance: `${items.length} eventos`
        };
        const updatedRoutes = [...this.initialMockRoutes, ...savedRoutes, newRoute];
        localStorage.setItem(SAVED_ROUTES_KEY, JSON.stringify(updatedRoutes));
        
        this.clearCurrentRoute();
        console.log('Roteiro finalizado e salvo:', newRoute);
        return true;
      } catch (e) {
        console.error('Erro ao salvar roteiro final', e);
        return false;
      }
    }
    return false;
  }
  getSavedRoutes(): any[] {
    if (this.isBrowser) {
      const saved = localStorage.getItem(SAVED_ROUTES_KEY);
      return saved ? JSON.parse(saved) : this.initialMockRoutes;
    }
    return this.initialMockRoutes;
  }
  
  // --- MÉTODOS EXISTENTES ABAIXO (Mocks de Rotas) ---

  getAllRoutes(): Route[] { // <-- RETORNA Route[]
    return JSON.parse(JSON.stringify(this.allRoutes));
  }

  getVisibleRoutes(): Route[] { // <-- RETORNA Route[]
    return this.getAllRoutes().filter((route: Route) => route.isActive);
  }

  toggleRouteStatus(routeId: string) {
    const route = this.allRoutes.find((r) => r.id === routeId);
    if (route) {
      route.isActive = !route.isActive;
    }
  }
  
  registerUserToRoute(routeId: string): boolean {
    const route = this.allRoutes.find((r) => r.id === routeId);
    const currentUser = this.authService.getCurrentUser();

    if (route && currentUser) {
      const userEmail = currentUser.email;
      if (userEmail && !route.registeredUsers.includes(userEmail)) { // Verifica se email existe
        route.registeredUsers.push(userEmail);
        console.log('Usuários na rota:', route.registeredUsers);
        return true; 
      }
    }
    return false; 
  }
}