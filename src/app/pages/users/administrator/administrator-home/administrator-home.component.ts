// src/app/pages/users/administrator/administrator-home/administrator-home.component.ts

import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  OnDestroy,
  signal, // <-- 1. Importar signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Chart, registerables, TooltipItem } from 'chart.js';
import { Subscription, combineLatest, of } from 'rxjs';
import { switchMap, startWith, tap } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // <-- 2. Importar Sanitize

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
  private sanitizer = inject(DomSanitizer); // <-- 3. Injetar o Sanitizer

  // ... (ViewChilds e setters dos gráficos) ...
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

  // 4. Mapeamento de URLs e signal
  private regionMapUrls: Record<string, string> = {
    all: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117364.55073427976!2d-48.16914561842045!3d-23.47353932644246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c6328a9b244799%3A0x63428d022b39f3c!2sInterior%20de%20S%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1717462000000!5m2!1spt-BR!2sbr',
    sorocaba: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234281.3323485458!2d-47.63223151525426!3d-23.44421213076127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c58abceb02f0fb%3A0x4a58312760f38693!2sSorocaba%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1731174980645!5m2!1spt-BR!2sbr',
    campinas: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235252.1790432884!2d-47.190366885836!3d-22.913398042456723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c808b2612e59%3A0x622a03651111000a!2sCampinas%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1731175020739!5m2!1spt-BR!2sbr',
    tatui: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58673.07921890356!2d-47.88725831102927!3d-23.3512140669299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c5d8e7b165296d%3A0x6a0a09e0a80e1c31!2sTatu%C3%AD%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1731175051910!5m2!1spt-BR!2sbr'
  };

  mapUrl = signal<SafeResourceUrl | null>(null);

  private dataSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.dataSubscription = combineLatest([
      this.regionControl.valueChanges.pipe(startWith(this.regionControl.value)),
      this.periodControl.valueChanges.pipe(startWith(this.periodControl.value)),
    ])
      .pipe(
        // 5. Atualizar a URL do mapa aqui
        tap(([region, period]) => {
          const url = this.regionMapUrls[region || 'all'];
          this.mapUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
        }),
        switchMap(([region, period]) => {
          this.isLoading = true;
          this.destroyCharts();

          const currentRegion = region || 'all';
          const currentPeriod = period || '30days';

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
          this.kpis = kpis;
          this.growthData = growthData;
          this.distributionData = distributionData;
          this.contentData = contentData;
          this.engagementData = engagementData;

          this.isLoading = false;

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

  // ... (destroyCharts e todos os métodos createChart) ...
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