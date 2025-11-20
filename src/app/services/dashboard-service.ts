import { Injectable, inject } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { CommerceService } from './commerce.service';
import { RoutesService } from './routes.service';
import { User, UserRole } from '../interfaces/user';
import { Route } from '../interfaces/routes';
import { Commerce } from '../interfaces/commerce';

export interface KpiData { title: string; value: string | number; icon: string; unit: string; color: string; }
export interface GrowthData { labels: string[]; datasets: { label: string; data: number[]; color: string; }[]; }
export interface DistributionData { labels: string[]; data: number[]; colors: string[]; }
export interface EngagementData { labels: string[]; data: number[]; backgroundColor: string; }

type Period = '7days' | '30days' | '6months' | string;
type Region = 'all' | 'sorocaba' | 'campinas' | 'tatui' | string;
type FilterableItem = User | Commerce | Route;

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private userService = inject(UserService);
  private commerceService = inject(CommerceService);
  private routesService = inject(RoutesService);

  private colors = {
    primary: '#4F46E5', primaryLight: '#A5B4FC', secondary: '#F59E0B',
    success: '#10B981', danger: '#EF4444', gray: '#6B7280',
  };

  // --- HELPER METHODS ---
  private getStartDate(period: Period): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (period === '7days') today.setDate(today.getDate() - 7);
    else if (period === '30days') today.setDate(today.getDate() - 30);
    else if (period === '6months') today.setMonth(today.getMonth() - 6);
    else today.setFullYear(today.getFullYear() - 5);
    return today;
  }

  private filterByPeriod<T extends FilterableItem>(items: T[], period: Period): T[] {
    if (period === 'all') return items;
    const startDate = this.getStartDate(period);
    return items.filter((item) => new Date(item.creationDate!) >= startDate);
  }

  private filterByRegion<T extends FilterableItem>(items: T[], region: Region): T[] {
    if (region === 'all') return items;
    return items.filter((item) => item.region === region);
  }

  private generateDateLabels(period: Period): string[] {
    const labels: string[] = [];
    const today = new Date();
    if (period === '7days') {
      for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setDate(today.getDate() - i);
        labels.push(d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric' }));
      }
    } else if (period === '30days') {
      for (let i = 4; i >= 0; i--) {
        const d = new Date(); d.setDate(today.getDate() - i * 7);
        labels.push(`Sem ${d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric' })}`);
      }
    } else {
      for (let i = 5; i >= 0; i--) {
        const d = new Date(); d.setMonth(today.getMonth() - i);
        labels.push(d.toLocaleDateString('pt-BR', { month: 'short' }));
      }
    }
    return labels;
  }

  private bucketizeData(items: FilterableItem[], period: Period): number[] {
    const labels = this.generateDateLabels(period);
    const buckets: number[] = new Array(labels.length).fill(0);
    const today = new Date(); today.setHours(0, 0, 0, 0);

    for (const item of items) {
      const itemDate = new Date(item.creationDate!); itemDate.setHours(0, 0, 0, 0);
      let bucketIndex = -1;

      if (period === '7days') {
        const diffDays = Math.floor((today.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24));
        bucketIndex = (labels.length - 1) - diffDays;
      } else if (period === '30days') {
        const diffWeeks = Math.floor((today.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
        bucketIndex = (labels.length - 1) - diffWeeks;
      } else {
        const diffMonths = (today.getFullYear() - itemDate.getFullYear()) * 12 + (today.getMonth() - itemDate.getMonth());
        bucketIndex = (labels.length - 1) - diffMonths;
      }

      if (bucketIndex >= 0 && bucketIndex < labels.length) buckets[bucketIndex]++;
    }
    return buckets;
  }

  // --- DATA METHODS ---

  private getAllData() {
    // Usa forkJoin para carregar todos os dados, tratando getAllCommerces como assíncrono
    return forkJoin({
      users: of(this.userService.getAllUsers()),
      commerces: this.commerceService.getAllCommerces(),
      routes: of(this.routesService.getAllRoutes())
    });
  }

  getBigNumbers(region: Region, period: Period): Observable<KpiData[]> {
    return this.getAllData().pipe(
      map(({ users, commerces, routes }) => {
        const filteredUsers = this.filterByRegion(this.filterByPeriod(users, period), region);
        const filteredCommerces = this.filterByRegion(this.filterByPeriod(commerces, period), region);
        const filteredRoutes = this.filterByRegion(this.filterByPeriod(routes, period), region);

        const activeRoutesCount = filteredRoutes.filter((r) => r.isActive).length;
        const totalRegisteredUsers = filteredRoutes.reduce((sum, route) => sum + (route.registeredUsers?.length || 0), 0);
        const avgRouteEngagement = activeRoutesCount > 0 ? totalRegisteredUsers / activeRoutesCount : 0;

        let eventsCreated = 20; // Mock dinâmico
        if (period === '7days') eventsCreated = 5;
        if (region === 'tatui') eventsCreated = 8;

        return [
          { title: 'Total de Usuários', value: filteredUsers.length, icon: 'group', unit: 'Usuários', color: this.colors.primary },
          { title: 'Comércios Cadastrados', value: filteredCommerces.length, icon: 'store', unit: 'Comércios', color: this.colors.success },
          { title: 'Rotas Ativas', value: activeRoutesCount, icon: 'map', unit: 'Rotas', color: this.colors.secondary },
          { title: `Novos Usuários`, value: `+${this.filterByPeriod(users, period).length}`, icon: 'person_add', unit: 'Total', color: this.colors.danger },
          { title: 'Eventos Criados', value: eventsCreated, icon: 'event', unit: 'Eventos', color: this.colors.primary },
          { title: 'Engajamento Médio', value: avgRouteEngagement.toFixed(1), icon: 'bar_chart', unit: 'Usuários/Rota', color: this.colors.gray },
        ];
      })
    );
  }

  getUsersGrowthData(region: Region, period: Period): Observable<GrowthData> {
    return of(this.userService.getAllUsers()).pipe(
      map(users => {
        const filteredUsers = this.filterByRegion(users, region);
        const labels = this.generateDateLabels(period);
        return {
          labels: labels,
          datasets: [
            { label: 'Viajantes', data: this.bucketizeData(filteredUsers.filter(u => u.role === 'viajante'), period), color: this.colors.primary },
            { label: 'Empreendedores', data: this.bucketizeData(filteredUsers.filter(u => u.role === 'empreendedor'), period), color: this.colors.success },
            { label: 'Promotores', data: this.bucketizeData(filteredUsers.filter(u => u.role === 'promotor_turistico'), period), color: this.colors.secondary },
          ],
        };
      })
    );
  }

  getProfileDistributionData(region: Region, period: Period): Observable<DistributionData> {
    return of(this.userService.getAllUsers()).pipe(
      map(users => {
        const filteredUsers = this.filterByRegion(this.filterByPeriod(users, period), region);
        const roleCounts = ['viajante', 'empreendedor', 'promotor_turistico', 'administrador'].map(
          (role) => filteredUsers.filter((u) => u.role === role).length
        );
        return {
          labels: ['Viajantes', 'Empreendedores', 'Promotores', 'Admins'],
          data: roleCounts,
          colors: [this.colors.primary, this.colors.success, this.colors.secondary, this.colors.gray],
        };
      })
    );
  }

  getContentCreationData(region: Region, period: Period): Observable<GrowthData> {
    return forkJoin({
      commerces: this.commerceService.getAllCommerces(),
      routes: of(this.routesService.getAllRoutes())
    }).pipe(
      map(({ commerces, routes }) => {
        const filteredCommerces = this.filterByRegion(commerces, region);
        const filteredRoutes = this.filterByRegion(routes, region);
        const labels = this.generateDateLabels(period);
        return {
          labels: labels,
          datasets: [
            { label: 'Comércios', data: this.bucketizeData(filteredCommerces, period), color: this.colors.secondary },
            { label: 'Rotas', data: this.bucketizeData(filteredRoutes, period), color: this.colors.primary },
            { label: 'Eventos', data: this.bucketizeData([], period).map(() => Math.floor(Math.random() * 5)), color: this.colors.danger },
          ],
        };
      })
    );
  }

  getTopRouteEngagement(region: Region, period: Period): Observable<EngagementData> {
    return of(this.routesService.getAllRoutes()).pipe(
      map(routes => {
        const filteredRoutes = this.filterByRegion(this.filterByPeriod(routes, period), region);
        const topRoutes = filteredRoutes
          .map((r) => ({ title: r.title, engagement: r.registeredUsers?.length || 0 }))
          .sort((a, b) => b.engagement - a.engagement)
          .slice(0, 5);

        return {
          labels: topRoutes.map((r) => r.title),
          data: topRoutes.map((r) => r.engagement),
          backgroundColor: this.colors.primary,
        };
      })
    );
  }
}