import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { CommerceService } from './commerce.service';
import { RoutesService } from './routes.service';
import { User, UserRole } from '../interfaces/user';
import { Route } from '../interfaces/routes'; // Importar Route
import { Commerce } from '../interfaces/commerce'; // Importar Commerce

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

type Period = '7days' | '30days' | '6months' | string;
type Region = 'all' | 'sorocaba' | 'campinas' | 'tatui' | string;

// CORREÇÃO: Este tipo genérico agora é a união dos tipos que ele pode filtrar.
type FilterableItem = User | Commerce | Route;

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

  // --- FUNÇÕES HELPER DE FILTRAGEM ---

  private getStartDate(period: Period): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zera a hora para comparações
    if (period === '7days') {
      today.setDate(today.getDate() - 7);
    } else if (period === '30days') {
      today.setDate(today.getDate() - 30);
    } else if (period === '6months') {
      today.setMonth(today.getMonth() - 6);
    } else {
      // 'all' ou fallback
      today.setFullYear(today.getFullYear() - 5);
    }
    return today;
  }

  // CORREÇÃO: A constraint genérica T agora é a união 'FilterableItem'
  private filterByPeriod<T extends FilterableItem>(
    items: T[],
    period: Period
  ): T[] {
    if (period === 'all') return items;
    const startDate = this.getStartDate(period);
    return items.filter(
      (item) => new Date(item.creationDate!) >= startDate
    );
  }

  // CORREÇÃO: A constraint genérica T agora é a união 'FilterableItem'
  private filterByRegion<T extends FilterableItem>(
    items: T[],
    region: Region
  ): T[] {
    if (region === 'all') return items;
    return items.filter((item) => item.region === region);
  }

  // --- 1. BIG NUMBERS (KPIs) ---
  getBigNumbers(region: Region, period: Period): Observable<KpiData[]> {
    // 1. Busca todos os dados (já tipados pelos services)
    let allUsers = this.userService.getAllUsersMock();
    let allCommerces = this.commerceService.getAllCommercesForUserMock();
    let allRoutes = this.routesService.getAllRoutes();

    // 2. Filtra as listas (Agora tipado corretamente)
    const filteredUsers = this.filterByRegion(this.filterByPeriod(allUsers, period), region);
    const filteredCommerces = this.filterByRegion(this.filterByPeriod(allCommerces, period), region);
    const filteredRoutes = this.filterByRegion(this.filterByPeriod(allRoutes, period), region);

    // 3. Calcula os KPIs (Agora com tipos corretos)
    const totalUsers = filteredUsers.length;
    const commercesCount = filteredCommerces.length;
    const activeRoutesCount = filteredRoutes.filter((r) => r.isActive).length;

    // "Novos Usuários"
    const newUsers = this.filterByPeriod(allUsers, period).length;
    
    // "Eventos Criados" (mockado, mas agora dinâmico)
    let eventsCreated = 20;
    if (period === '7days') eventsCreated = 5;
    if (region === 'tatui') eventsCreated = 8;

    const totalRegisteredUsers = filteredRoutes.reduce(
      (sum, route) => sum + (route.registeredUsers?.length || 0),
      0
    );
    const avgRouteEngagement =
      activeRoutesCount > 0 ? totalRegisteredUsers / activeRoutesCount : 0;

    const kpiData: KpiData[] = [
      {
        title: 'Total de Usuários',
        value: totalUsers,
        icon: 'group',
        unit: 'Usuários (na seleção)',
        color: this.colors.primary,
      },
      {
        title: 'Comércios Cadastrados',
        value: commercesCount,
        icon: 'store',
        unit: 'Comércios (na seleção)',
        color: this.colors.success,
      },
      {
        title: 'Rotas Ativas',
        value: activeRoutesCount,
        icon: 'map',
        unit: 'Rotas (na seleção)',
        color: this.colors.secondary,
      },
      {
        title: `Novos Usuários (${period})`,
        value: `+${newUsers}`,
        icon: 'person_add',
        unit: 'Usuários (total)',
        color: this.colors.danger,
      },
      {
        title: 'Eventos Criados',
        value: eventsCreated,
        icon: 'event',
        unit: 'Eventos (mock)',
        color: this.colors.primary,
      },
      {
        title: 'Engajamento Médio',
        value: avgRouteEngagement.toFixed(1),
        icon: 'bar_chart',
        unit: 'Usuários/Rota (na seleção)',
        color: this.colors.gray,
      },
    ];

    return of(kpiData);
  }

  // --- 2. GRÁFICOS ---

  // Helper para gerar labels de data para gráficos
  private generateDateLabels(period: Period): string[] {
    const labels: string[] = [];
    const today = new Date();
    
    if (period === '7days') {
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        labels.push(d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric' }));
      }
    } else if (period === '30days') {
      for (let i = 4; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i * 7);
        labels.push(`Sem ${d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric' })}`);
      }
    } else { // 6months ou all
      for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(today.getMonth() - i);
        labels.push(d.toLocaleDateString('pt-BR', { month: 'short' }));
      }
    }
    return labels;
  }

  // Helper para alocar dados em "baldes" de data
  private bucketizeData(items: FilterableItem[], period: Period): number[] {
    const labels = this.generateDateLabels(period);
    const buckets: number[] = new Array(labels.length).fill(0);
    const today = new Date();
    today.setHours(0,0,0,0);
    
    for (const item of items) {
      const itemDate = new Date(item.creationDate!);
      itemDate.setHours(0,0,0,0);
      
      if (period === '7days') {
        const diffDays = Math.floor((today.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24));
        const bucketIndex = (labels.length - 1) - diffDays;
        if (bucketIndex >= 0 && bucketIndex < labels.length) buckets[bucketIndex]++;
      } 
      else if (period === '30days') {
         const diffWeeks = Math.floor((today.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
         const bucketIndex = (labels.length - 1) - diffWeeks;
         if (bucketIndex >= 0 && bucketIndex < labels.length) buckets[bucketIndex]++;
      } 
      else { // 6months ou all
        const diffMonths = (today.getFullYear() - itemDate.getFullYear()) * 12 + (today.getMonth() - itemDate.getMonth());
        const bucketIndex = (labels.length - 1) - diffMonths;
        if (bucketIndex >= 0 && bucketIndex < labels.length) buckets[bucketIndex]++;
      }
    }
    return buckets;
  }


  getUsersGrowthData(region: Region, period: Period): Observable<GrowthData> {
    const allUsers = this.userService.getAllUsersMock();
    const filteredUsers = this.filterByRegion(allUsers, region); // filteredUsers agora é User[]

    const labels = this.generateDateLabels(period);

    const data: GrowthData = {
      labels: labels,
      datasets: [
        {
          label: 'Viajantes',
          // CORREÇÃO: 'u' agora é 'User' e tem a prop 'role'
          data: this.bucketizeData(filteredUsers.filter(u => u.role === 'viajante'), period),
          color: this.colors.primary,
        },
        {
          label: 'Empreendedores',
          data: this.bucketizeData(filteredUsers.filter(u => u.role === 'empreendedor'), period),
          color: this.colors.success,
        },
        {
          label: 'Promotores',
          data: this.bucketizeData(filteredUsers.filter(u => u.role === 'promotor'), period),
          color: this.colors.secondary,
        },
      ],
    };
    return of(data);
  }

  getProfileDistributionData(region: Region, period: Period): Observable<DistributionData> {
    const allUsers = this.userService.getAllUsersMock();
    const filteredUsers = this.filterByRegion(this.filterByPeriod(allUsers, period), region);
    
    const roles: UserRole[] = ['viajante', 'empreendedor', 'promotor', 'administrador'];
    const roleCounts = roles.map(
      (role) => filteredUsers.filter((u) => u.role === role).length // 'u' é User
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

  getContentCreationData(region: Region, period: Period): Observable<GrowthData> {
    const commerces = this.filterByRegion(this.commerceService.getAllCommercesForUserMock(), region);
    const routes = this.filterByRegion(this.routesService.getAllRoutes(), region);
    
    const labels = this.generateDateLabels(period);

    const data: GrowthData = {
      labels: labels,
      datasets: [
        {
          label: 'Comércios',
          data: this.bucketizeData(commerces, period),
          color: this.colors.secondary,
        },
        {
          label: 'Rotas',
          data: this.bucketizeData(routes, period),
          color: this.colors.primary,
        },
        {
          label: 'Eventos (Mock)',
          data: this.bucketizeData([], period).map(() => Math.floor(Math.random() * 5)), // Mock
          color: this.colors.danger,
        },
      ],
    };
    return of(data);
  }

  getTopRouteEngagement(region: Region, period: Period): Observable<EngagementData> {
    const allRoutes = this.routesService.getAllRoutes();
    const filteredRoutes = this.filterByRegion(this.filterByPeriod(allRoutes, period), region);
    
    const topRoutes = filteredRoutes
      .map((r) => ({ // 'r' é Route
        title: r.title,
        engagement: r.registeredUsers?.length || 0,
      }))
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 5);

    const data: EngagementData = {
      labels: topRoutes.map((r) => r.title),
      data: topRoutes.map((r) => r.engagement),
      backgroundColor: this.colors.primary,
    };
    return of(data);
  }
}