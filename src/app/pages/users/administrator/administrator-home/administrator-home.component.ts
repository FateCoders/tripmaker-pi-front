// src/app/pages/users/administrator/administrator-home/administrator-home.component.ts

import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Chart, registerables, TooltipItem } from 'chart.js';
import { Subscription, combineLatest, of } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

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
    MatIconModule,
    ReactiveFormsModule,
    MatChipsModule,
  ],
  templateUrl: './administrator-home.component.html',
  styleUrls: ['./administrator-home.component.scss'],
})
export class AdministratorHome implements OnInit, OnDestroy {
  private dashboardService = inject(DashboardService);
  private authService = inject(AuthService);

  // 1. Variáveis para armazenar as referências do Canvas
  private growthChartRef: ElementRef<HTMLCanvasElement> | undefined;
  private distributionChartRef: ElementRef<HTMLCanvasElement> | undefined;
  private contentCreationChartRef: ElementRef<HTMLCanvasElement> | undefined;
  private engagementChartRef: ElementRef<HTMLCanvasElement> | undefined;

  // 2. Variáveis para armazenar os DADOS dos gráficos
  private growthData: GrowthData | null = null;
  private distributionData: DistributionData | null = null;
  private contentData: GrowthData | null = null;
  private engagementData: any | null = null;

  // 3. Setters para os @ViewChild
  @ViewChild('growthChart') set growthChart(
    elRef: ElementRef<HTMLCanvasElement> | undefined
  ) {
    if (elRef) {
      this.growthChartRef = elRef;
      this.createUsersGrowthChart();
    }
  }
  @ViewChild('distributionChart') set distributionChart(
    elRef: ElementRef<HTMLCanvasElement> | undefined
  ) {
    if (elRef) {
      this.distributionChartRef = elRef;
      this.createProfileDistributionChart();
    }
  }
  @ViewChild('contentCreationChart') set contentCreationChart(
    elRef: ElementRef<HTMLCanvasElement> | undefined
  ) {
    if (elRef) {
      this.contentCreationChartRef = elRef;
      this.createContentCreationChart();
    }
  }
  @ViewChild('engagementChart') set engagementChart(
    elRef: ElementRef<HTMLCanvasElement> | undefined
  ) {
    if (elRef) {
      this.engagementChartRef = elRef;
      this.createTopRouteEngagementChart();
    }
  }

  // Variáveis para armazenar as instâncias dos gráficos
  private growthChartInstance!: Chart;
  private distributionChartInstance!: Chart;
  private contentCreationChartInstance!: Chart;
  private engagementChartInstance!: Chart;

  kpis: KpiData[] = [];
  isLoading = true;

  // Filtros
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
    { value: 'all', label: 'Todo o período' },
  ];

  private dataSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    // CORREÇÃO: O combineLatest agora só observa os filtros
    this.dataSubscription = combineLatest([
      this.regionControl.valueChanges.pipe(startWith(this.regionControl.value)),
      this.periodControl.valueChanges.pipe(startWith(this.periodControl.value)),
    ])
      .pipe(
        // O switchMap usa os valores dos filtros para chamar os serviços
        switchMap(([region, period]) => {
          this.isLoading = true;
          this.destroyCharts(); // Limpa gráficos antigos

          const currentRegion = region || 'all';
          const currentPeriod = period || '30days';

          // CORREÇÃO: Passa os filtros para TODOS os métodos do service
          return combineLatest([
            this.dashboardService.getBigNumbers(currentRegion, currentPeriod),
            this.dashboardService.getUsersGrowthData(currentRegion, currentPeriod),
            this.dashboardService.getProfileDistributionData(currentRegion, currentPeriod),
            this.dashboardService.getContentCreationData(currentRegion, currentPeriod),
            this.dashboardService.getTopRouteEngagement(currentRegion, currentPeriod),
          ]);
        })
      )
      .subscribe({
        next: ([kpis, growthData, distributionData, contentData, engagementData]) => {
          // Armazena todos os dados
          this.kpis = kpis;
          this.growthData = growthData;
          this.distributionData = distributionData;
          this.contentData = contentData;
          this.engagementData = engagementData;

          this.isLoading = false;

          // Tenta (re)criar os gráficos
          this.createUsersGrowthChart();
          this.createProfileDistributionChart();
          this.createContentCreationChart();
          this.createTopRouteEngagementChart();
        },
        error: (err) => {
          console.error('Erro ao carregar dados do dashboard:', err);
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.destroyCharts();
  }

  destroyCharts(): void {
    if (this.growthChartInstance) this.growthChartInstance.destroy();
    if (this.distributionChartInstance) this.distributionChartInstance.destroy();
    if (this.contentCreationChartInstance) this.contentCreationChartInstance.destroy();
    if (this.engagementChartInstance) this.engagementChartInstance.destroy();
  }

  // --- MÉTODOS DE CRIAÇÃO DOS GRÁFICOS (sem alterações) ---

  private createUsersGrowthChart(): void {
    if (!this.growthData || !this.growthChartRef) {
      return;
    }
    if (this.growthChartInstance) this.growthChartInstance.destroy();
    const ctx = this.growthChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.growthChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.growthData.labels,
        datasets: this.growthData.datasets.map((dataset) => ({
          label: dataset.label,
          data: dataset.data,
          backgroundColor: this.hexToRgba(dataset.color, 0.4),
          borderColor: dataset.color,
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          stack: 'combined',
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
            stacked: true,
            beginAtZero: true,
            title: { display: true, text: 'Nº de Usuários' },
          },
        },
      },
    });
  }

  private createProfileDistributionChart(): void {
    if (!this.distributionData || !this.distributionChartRef) {
      return;
    }
    if (this.distributionChartInstance) this.distributionChartInstance.destroy();
    const ctx = this.distributionChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.distributionChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.distributionData.labels,
        datasets: [
          {
            data: this.distributionData.data,
            backgroundColor: this.distributionData.colors,
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

  private createContentCreationChart(): void {
    if (!this.contentData || !this.contentCreationChartRef) {
      return;
    }
    if (this.contentCreationChartInstance) this.contentCreationChartInstance.destroy();
    const ctx = this.contentCreationChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.contentCreationChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.contentData.labels,
        datasets: this.contentData.datasets.map((dataset) => ({
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

  private createTopRouteEngagementChart(): void {
    if (!this.engagementData || !this.engagementChartRef) {
      return;
    }
    if (this.engagementChartInstance) this.engagementChartInstance.destroy();
    const ctx = this.engagementChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.engagementChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.engagementData.labels,
        datasets: [
          {
            label: 'Inscrições',
            data: this.engagementData.data,
            backgroundColor: this.engagementData.backgroundColor,
            borderColor: this.engagementData.backgroundColor,
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
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

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}