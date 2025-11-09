import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
  signal, // 1. Importar o 'signal'
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, TooltipItem } from 'chart.js/auto';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { RoutesService } from '../../../../services/routes.service';
import { GoogleMapIframeComponent } from '../../../../components/google-map-iframe/google-map-iframe';
import { Chip } from "../../../../components/chip/chip";

// Interface mockada
export interface EventRouteDetails {
  id: string;
  name: string;
  address: string;
  visitors: string;
  rating: number;
  hours: string;
  tags: string[];
  dailyVisitors: string;
  dailyVisitorsLabel: string;
  locationQuery: string;
  chartData: number[];
  chartLabels: string[];
}

@Component({
  selector: 'app-tourism-promoter-event-details',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    FooterUsercomumComponent,
    HeaderTitle,
    MatButtonModule,
    MatIconModule,
    GoogleMapIframeComponent,
    Chip
],
  templateUrl: './tourism-promoter-event-details.html',
  styleUrl: './tourism-promoter-event-details.scss',
})
export class TourismPromoterEventDetails implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private routesService = inject(RoutesService);
  private cdr = inject(ChangeDetectorRef);
  private sanitizer = inject(DomSanitizer);

  private chartInstance: Chart | undefined;

  @ViewChild('visitorsChart') set visitorsChart(elRef: ElementRef<HTMLCanvasElement> | undefined) {
    if (elRef) {
      this.chartRef = elRef;
      this.createChartIfReady(); 
    }
  }
  private chartRef: ElementRef<HTMLCanvasElement> | undefined;

  isLoading = true;
  eventData: EventRouteDetails | null = null;
  
  // 2. Transformar mapUrl numa propriedade 'signal'
  // (Usamos <string> porque o componente google-map-iframe espera uma string)
  mapUrl = signal<string>('');

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.loadEventData(eventId);
    } else {
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.chartInstance?.destroy();
  }

  loadEventData(id: string): void {
    this.isLoading = true;
    this.chartInstance?.destroy();
    this.chartInstance = undefined;
    this.mapUrl.set(''); // 3. Limpar o signal durante o carregamento

    setTimeout(() => {
      const mockData: EventRouteDetails = {
        id: id,
        name: 'Nome do Evento/Rota',
        address: 'Endereço',
        visitors: '355',
        rating: 5,
        hours: '00h00 - 00h00',
        tags: ['Cultural', 'Pet Friend'],
        dailyVisitors: '144',
        dailyVisitorsLabel: 'No 2º Dia seu Evento teve',
        locationQuery: 'Conservatório de Tatuí, Tatuí - SP', 
        chartLabels: ['Dom', 'Seg', 'Dia 2', 'Qua', 'Qui', 'Sex', 'Sáb'], 
        chartData: [40, 60, 144, 90, 100, 110, 120], 
      };

      this.eventData = mockData;
      // 4. Definir o valor do signal usando .set()
      this.mapUrl.set(this.getMapUrl(this.eventData.locationQuery));
      
      this.isLoading = false;
      this.cdr.detectChanges(); 
      this.createChartIfReady(); 
    }, 500);
  }

  private getMapUrl(query: string): string {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    return url;
  }

  get ratingStars(): boolean[] {
    if (!this.eventData) return [];
    return Array(5)
      .fill(false)
      .map((_, i) => i < this.eventData!.rating);
  }

  goBack(): void {
    this.router.navigate(['/promotor_turistico/inicio']);
  }

  private createChartIfReady(): void {
    if (typeof window !== 'undefined' && this.chartRef && this.eventData && !this.chartInstance) {
      this.createVisitorsChart(this.chartRef.nativeElement, this.eventData);
    }
  }

  private createVisitorsChart(canvas: HTMLCanvasElement, data: EventRouteDetails): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Falha ao obter o contexto 2D do canvas.');
      return;
    }

    this.chartInstance?.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, 150); 
    gradient.addColorStop(0, 'rgba(0, 123, 255, 0.4)'); 
    gradient.addColorStop(1, 'rgba(0, 123, 255, 0)'); 

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.chartLabels,
        datasets: [
          {
            label: 'Visitantes',
            data: data.chartData,
            fill: true,
            backgroundColor: gradient, 
            borderColor: 'var(--primary-color-dark)', 
            borderWidth: 2.5,
            tension: 0.4, 
            pointRadius: 0, 
            pointHoverRadius: 6,
            pointHoverBackgroundColor: 'var(--primary-color-dark)',
            pointHoverBorderColor: 'var(--white-color)',
            pointHoverBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            display: false, 
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'var(--text-color-dark)',
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 12 },
            padding: 10,
            caretPadding: 10,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: (context: TooltipItem<'line'>) => {
                return `${context.parsed.y} visitantes`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false, 
            },
            ticks: {
              display: false, 
            },
            border: {
              display: false, 
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false, 
            },
            ticks: {
              display: false, 
            },
            border: {
              display: false, 
            },
          },
        },
      },
    });
  }
}