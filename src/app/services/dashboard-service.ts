import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { CommerceService } from './commerce.service';
import { RoutesService } from './routes.service';
import { UserRole } from '../interfaces/user';

// Interface para os dados do Big Number
export interface KpiData {
  title: string;
  value: string | number;
  icon: string;
  unit: string;
  color: string;
}

// Interface para os dados de Crescimento (Gráfico de Linha/Área)
export interface GrowthData {
  labels: string[]; // Ex: Meses
  datasets: {
    label: string;
    data: number[];
    color: string;
  }[];
}

// Interface para dados de Distribuição (Gráfico de Rosca/Pizza)
export interface DistributionData {
  labels: string[]; // Ex: Perfis de Usuário
  data: number[];
  colors: string[];
}

// Interface para dados de Engajamento (Gráfico de Barras)
export interface EngagementData {
  labels: string[]; // Ex: Nomes de Rotas
  data: number[];
  backgroundColor: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private userService = inject(UserService);
  private commerceService = inject(CommerceService);
  private routesService = inject(RoutesService);

  // Cores personalizadas para os gráficos
  private colors = {
    primary: '#4F46E5', // Indigo 600
    primaryLight: '#A5B4FC', // Indigo 300
    secondary: '#F59E0B', // Amber 500
    success: '#10B981', // Emerald 500
    danger: '#EF4444', // Red 500
    gray: '#6B7280', // Gray 500
  };

  constructor() {}

  // --- 1. BIG NUMBERS (KPIs) ---
  getBigNumbers(): Observable<KpiData[]> {
    const allUsers = this.userService.getAllUsersMock();
    const commerces = this.commerceService.getAllCommercesForUserMock();
    const routes = this.routesService.getAllRoutes();

    const totalUsers = allUsers.length;
    const commercesCount = commerces.length;
    const activeRoutesCount = routes.filter((r) => r.isActive).length;
    const totalRegisteredUsers = routes.reduce(
      (sum, route) => sum + (route.registeredUsers?.length || 0),
      0
    );
    const avgRouteEngagement =
      activeRoutesCount > 0 ? totalRegisteredUsers / activeRoutesCount : 0;

    // Dados Mockados para "Novos Usuários" e "Eventos Criados"
    const mockData: KpiData[] = [
      {
        title: 'Total de Usuários',
        value: totalUsers,
        icon: 'group',
        unit: 'Usuários',
        color: this.colors.primary,
      },
      {
        title: 'Comércios Cadastrados',
        value: commercesCount,
        icon: 'store',
        unit: 'Comércios',
        color: this.colors.success,
      },
      {
        title: 'Rotas Ativas',
        value: activeRoutesCount,
        icon: 'map',
        unit: 'Rotas',
        color: this.colors.secondary,
      },
      {
        title: 'Novos Usuários (30 dias)',
        value: '+15', // Mock fixo
        icon: 'person_add',
        unit: 'Usuários',
        color: this.colors.danger,
      },
      {
        title: 'Eventos Criados (Mês)',
        value: 20, // Mock fixo
        icon: 'event',
        unit: 'Eventos',
        color: this.colors.primary,
      },
      {
        title: 'Engajamento Médio da Rota',
        value: avgRouteEngagement.toFixed(1),
        icon: 'bar_chart',
        unit: 'Usuários/Rota',
        color: this.colors.gray,
      },
    ];

    return of(mockData);
  }

  // --- 2. GRÁFICOS ---

  // Mock de Crescimento de Usuários por Perfil
  getUsersGrowthData(): Observable<GrowthData> {
    // Meses Mockados
    const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];

    const data: GrowthData = {
      labels: labels,
      datasets: [
        {
          label: 'Viajantes',
          data: [10, 15, 20, 35, 40, 50],
          color: this.colors.primary,
        },
        {
          label: 'Empreendedores',
          data: [2, 3, 5, 8, 10, 12],
          color: this.colors.success,
        },
        {
          label: 'Promotores',
          data: [1, 1, 2, 2, 3, 4],
          color: this.colors.secondary,
        },
      ],
    };
    return of(data);
  }

  // Mock de Distribuição de Perfis
  getProfileDistributionData(): Observable<DistributionData> {
    const allUsers = this.userService.getAllUsersMock();
    const roles: UserRole[] = [
      'viajante',
      'empreendedor',
      'promotor',
      'administrador',
    ];
    const roleCounts = roles.map(
      (role) => allUsers.filter((u) => u.role === role).length
    );

    const data: DistributionData = {
      labels: ['Viajantes', 'Empreendedores', 'Promotores', 'Administradores'],
      data: roleCounts,
      colors: [
        this.colors.primary,
        this.colors.success,
        this.colors.secondary,
        this.colors.gray,
      ],
    };
    return of(data);
  }

  // Mock de Criação de Conteúdo ao Longo do Tempo
  getContentCreationData(): Observable<GrowthData> {
    const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];

    const data: GrowthData = {
      labels: labels,
      datasets: [
        {
          label: 'Comércios',
          data: [3, 5, 4, 6, 7, 5],
          color: this.colors.secondary,
        },
        {
          label: 'Rotas',
          data: [1, 2, 1, 3, 2, 4],
          color: this.colors.primary,
        },
        {
          label: 'Eventos',
          data: [5, 8, 10, 7, 12, 9],
          color: this.colors.danger,
        },
      ],
    };
    return of(data);
  }

  // Mock de Engajamento de Rotas (Top 5)
  getTopRouteEngagement(): Observable<EngagementData> {
    const routes = this.routesService.getAllRoutes();
    const topRoutes = routes
      .map((r) => ({
        title: r.title,
        engagement: r.registeredUsers?.length || 0,
      }))
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 5); // Pega as top 5

    const data: EngagementData = {
      labels: topRoutes.map((r) => r.title),
      data: topRoutes.map((r) => r.engagement),
      backgroundColor: this.colors.primary,
    };
    return of(data);
  }
}
