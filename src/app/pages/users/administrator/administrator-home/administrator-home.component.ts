import { Component, OnInit, inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Chart, registerables, TooltipItem } from 'chart.js';
import { Subscription, combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import {
  DashboardService,
  KpiData,
  GrowthData,
  DistributionData,
} from '../../../../services/dashboard-service';
import { AuthService } from '../../../../services/auth.service';

Chart.register(...registerables);

@Component({
  selector: 'app-administrator-home',
  standalone: true,
  imports: [
    CommonModule,
    FooterUsercomumComponent,
    HeaderTitle,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './administrator-home.component.html',
  styleUrls: ['./administrator-home.component.scss'],
})
export class AdministratorHome implements OnInit, OnDestroy {
  private dashboardService = inject(DashboardService);
  private authService = inject(AuthService);

  // Referências dos Canvas para o Chart.js (ViewChilds)
  @ViewChild('growthChart') growthChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('distributionChart') distributionChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('contentCreationChart') contentCreationChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('engagementChart') engagementChartRef!: ElementRef<HTMLCanvasElement>;

  // Variáveis para armazenar as instâncias dos gráficos
  private growthChartInstance!: Chart;
  private distributionChartInstance!: Chart;
  private contentCreationChartInstance!: Chart;
  private engagementChartInstance!: Chart;

  kpis: KpiData[] = [];
  isLoading = true;

  // Filtros (Mocked)
  regionControl = new FormControl('all');
  periodControl = new FormControl('30days');

  regions = [
    { value: 'all', label: 'Todas as Regiões' },
    { value: 'sorocaba', label: 'Região de Sorocaba' },
    { value: 'campinas', label: 'Região de Campinas' },
    { value: 'tatui', label: 'Tatuí' },
  ];

  periods = [
    { value: '7days', label: 'Últimos 7 dias' },
    { value: '30days', label: 'Últimos 30 dias' },
    { value: '6months', label: 'Últimos 6 meses' },
  ];

  private chartSubscriptions: Subscription = new Subscription();
  private dataSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();

    this.dataSubscription = combineLatest([
      this.regionControl.valueChanges,
      this.periodControl.valueChanges,
      this.dashboardService.getBigNumbers(),
    ])
      .pipe(
        switchMap(([region, period, kpis]) => {
          this.kpis = kpis.map((kpi) => {
            if (kpi.title.includes('(30 dias)') && period === '7days') {
              return { ...kpi, title: 'Novos Usuários (7 dias)', value: '+5' };
            }
            return kpi;
          });

          return combineLatest([
            this.dashboardService.getUsersGrowthData(),
            this.dashboardService.getProfileDistributionData(),
            this.dashboardService.getContentCreationData(),
            this.dashboardService.getTopRouteEngagement(),
          ]);
        })
      )
      .subscribe({
        next: ([growthData, distributionData, contentData, engagementData]) => {
          this.isLoading = false;
          // Chama os métodos de criação dos gráficos com os dados mockados
          this.createUsersGrowthChart(growthData);
          this.createProfileDistributionChart(distributionData);
          this.createContentCreationChart(contentData);
          this.createTopRouteEngagementChart(engagementData);
        },
        error: (err) => {
          console.error('Erro ao carregar dados do dashboard:', err);
          this.isLoading = false;
        },
      });

    // Inicializa os controles para disparar a primeira busca
    this.regionControl.setValue('all');
    this.periodControl.setValue('30days');
  }

  ngOnDestroy(): void {
    this.chartSubscriptions.unsubscribe();
    this.dataSubscription.unsubscribe();
    // Destroi instâncias de Chart.js para evitar vazamento de memória
    this.destroyCharts();
  }

  destroyCharts(): void {
    if (this.growthChartInstance) this.growthChartInstance.destroy();
    if (this.distributionChartInstance) this.distributionChartInstance.destroy();
    if (this.contentCreationChartInstance) this.contentCreationChartInstance.destroy();
    if (this.engagementChartInstance) this.engagementChartInstance.destroy();
  }

  // --- MÉTODOS DE CRIAÇÃO DOS GRÁFICOS ---

  // 1. Gráfico de Crescimento de Usuários (Stacked Area)
  private createUsersGrowthChart(data: GrowthData): void {
    if (this.growthChartInstance) this.growthChartInstance.destroy(); // Destrói se já existir

    const ctx = this.growthChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.growthChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: data.datasets.map((dataset) => ({
          label: dataset.label,
          data: dataset.data,
          backgroundColor: this.hexToRgba(dataset.color, 0.4),
          borderColor: dataset.color,
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          stack: 'combined', // Empilha as áreas
          pointRadius: 4,
          pointHoverRadius: 6,
        })),
      },
      options: {
        animation: { duration: 1000, easing: 'easeOutQuart' },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12 } },
          title: { display: false },
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            stacked: true, // Habilita empilhamento
            beginAtZero: true,
            title: { display: true, text: 'Nº de Usuários' },
          },
        },
      },
    }); // Atribuição direta à instância
  }

  // 2. Gráfico de Distribuição de Perfis (Doughnut)
  private createProfileDistributionChart(data: DistributionData): void {
    if (this.distributionChartInstance) this.distributionChartInstance.destroy();

    const ctx = this.distributionChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.distributionChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [
          {
            data: data.data,
            backgroundColor: data.colors,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        animation: { duration: 1000, animateRotate: true, animateScale: true },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 12 } },
          title: { display: false },
        },
      },
    });
  }

  // 3. Gráfico de Criação de Conteúdo (Barra)
  private createContentCreationChart(data: GrowthData): void {
    if (this.contentCreationChartInstance) this.contentCreationChartInstance.destroy();

    const ctx = this.contentCreationChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.contentCreationChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: data.datasets.map((dataset) => ({
          label: dataset.label,
          data: dataset.data,
          backgroundColor: dataset.color,
          borderColor: dataset.color,
          borderWidth: 1,
        })),
      },
      options: {
        animation: { duration: 1000, easing: 'easeOutQuart' },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12 } },
          title: { display: false },
        },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true },
        },
      },
    });
  }

  // 4. Gráfico de Engajamento de Rotas (Horizontal Bar - Top 5)
  private createTopRouteEngagementChart(data: any): void {
    if (this.engagementChartInstance) this.engagementChartInstance.destroy();

    const ctx = this.engagementChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.engagementChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Inscrições',
            data: data.data,
            backgroundColor: data.backgroundColor,
            borderColor: data.backgroundColor,
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y', // Tornar as barras horizontais
        animation: { duration: 1000, easing: 'easeOutQuart' },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: false },
        },
        scales: {
          x: { beginAtZero: true },
          y: { grid: { display: false } },
        },
      },
    });
  }

  // Função utilitária para converter HEX para RGBA
  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
