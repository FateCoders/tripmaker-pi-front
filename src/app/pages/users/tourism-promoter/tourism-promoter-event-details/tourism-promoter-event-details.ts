import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, TooltipItem } from 'chart.js/auto'; // Importa Chart
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { RoutesService } from '../../../../services/routes.service';
import { GoogleMapIframeComponent } from '../../../../components/google-map-iframe/google-map-iframe';
import { Chip } from "../../../../components/chip/chip";

// Interface mockada para os detalhes do evento
export interface EventRouteDetails {
  id: string;
  name: string;
  address: string;
  visitors: string; // Visitantes (total)
  rating: number;
  hours: string;
  tags: string[];
  dailyVisitors: string; // Visitantes (do dia)
  dailyVisitorsLabel: string; // Label (No 2º Dia)
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

  // Ajuste no ViewChild para garantir que o gráfico seja criado
  @ViewChild('visitorsChart') set visitorsChart(elRef: ElementRef<HTMLCanvasElement> | undefined) {
    if (elRef) {
      this.chartRef = elRef;
      this.createChartIfReady(); // Tenta criar o gráfico assim que o canvas estiver disponível
    }
  }
  private chartRef: ElementRef<HTMLCanvasElement> | undefined;

  isLoading = true;
  eventData: EventRouteDetails | null = null;
  mapUrl = '';

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.loadEventData(eventId);
    } else {
      this.isLoading = false;
      // Tratar erro de ID não encontrado
    }
  }

  ngOnDestroy(): void {
    this.chartInstance?.destroy();
  }

  loadEventData(id: string): void {
    this.isLoading = true;
    this.chartInstance?.destroy();
    this.chartInstance = undefined;

    // Mock: Simula a busca de dados do evento
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
        chartLabels: ['Dom', 'Seg', 'Dia 2', 'Qua', 'Qui', 'Sex', 'Sáb'], // Labels do gráfico
        chartData: [40, 60, 144, 90, 100, 110, 120], // Dados do gráfico
      };

      this.eventData = mockData;
      this.isLoading = false;
      this.cdr.detectChanges(); // Força detecção de mudanças
      this.createChartIfReady(); // Tenta criar o gráfico
    }, 500);
  }

  private getSanitizedMapUrl(query: string): SafeResourceUrl {
    const encodedQuery = encodeURIComponent(query);
    // ATENÇÃO: A URL do mapa está mockada. Substitua pela URL correta da API do Google.
    const url = `https://www.google.com/maps/embed/v1/place?key=SUA_API_KEY&q=${encodedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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

    const gradient = ctx.createLinearGradient(0, 0, 0, 150); // Altura do gráfico
    gradient.addColorStop(0, 'rgba(0, 123, 255, 0.4)'); // Cor primária com transparência
    gradient.addColorStop(1, 'rgba(0, 123, 255, 0)'); // Transparente

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.chartLabels,
        datasets: [
          {
            label: 'Visitantes',
            data: data.chartData,
            fill: true,
            backgroundColor: gradient, // Gradiente azul
            borderColor: 'var(--primary-color-dark)', // Linha azul
            borderWidth: 2.5,
            tension: 0.4, // Curva suave
            pointRadius: 0, // Sem pontos
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
            display: false, // Esconde legenda
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
              display: false, // Sem linhas de grade X
            },
            ticks: {
              display: false, // Esconde labels do eixo X (Dia 1, Dia 2...)
            },
            border: {
              display: false, // Sem borda do eixo X
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false, // Sem linhas de grade Y
            },
            ticks: {
              display: false, // Esconde labels do eixo Y (100, 120...)
            },
            border: {
              display: false, // Sem borda do eixo Y
            },
          },
        },
      },
    });
  }
}
