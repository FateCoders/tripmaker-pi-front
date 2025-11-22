import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
  signal,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Chart, registerables, TooltipItem } from 'chart.js';

import { HeaderTitle } from '../../../../components/header-title/header-title';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { ChipButtonComponent } from '../../../../components/buttons/chip-button/chip-button';
import { RoutesService } from '../../../../services/routes.service'; // 1. Importar Service

Chart.register(...registerables);

@Component({
  selector: 'app-promoter-event-details',
  standalone: true,
  imports: [
    CommonModule,
    HeaderTitle,
    FooterUsercomumComponent,
    ChipButtonComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './promoter-event-details.html',
  styleUrls: ['./promoter-event-details.scss'],
})
export class PromoterEventDetails implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private cdr = inject(ChangeDetectorRef);
  private routesService = inject(RoutesService); // 2. Injetar Service

  @ViewChild('visitorsChart') set visitorsChart(
    elRef: ElementRef<HTMLCanvasElement> | undefined
  ) {
    if (elRef) {
      this.createVisitorsChart(elRef.nativeElement);
    }
  }
  private chartInstance: Chart | undefined;

  isLoading = signal(true);
  mapUrl = signal<SafeResourceUrl | null>(null);
  
  // Estado para controlar o tipo de conteúdo
  isRoute = signal(false);

  // Textos Dinâmicos
  pageTitle = computed(() => this.isRoute() ? 'Rota' : 'Evento');
  entityNameLabel = computed(() => this.isRoute() ? 'Nome da Rota' : 'Nome do Evento');
  statCardText = computed(() => this.isRoute() ? 'sua Rota' : 'seu Evento');

  // Dados Padrão (Inicializado vazio ou com mock de fallback)
  eventData: any = {
    id: '',
    title: '',
    address: '',
    image: '',
    visitorsTotal: 0,
    rating: 0,
    hours: '',
    category: '',
    features: [],
    dayStat: { day: '', count: 0 },
    locationQuery: '' 
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const pathSegment = this.route.snapshot.url[1]?.path; 
    this.isRoute.set(pathSegment === 'rota');

    this.isLoading.set(true);

    setTimeout(() => {
      if (this.isRoute() && id) {
        this.loadRouteData(id);
      } else {
        this.loadEventMock(id);
      }
      
      // Carrega o mapa com base no endereço ou região
      this.mapUrl.set(this.getSanitizedMapUrl(this.eventData.locationQuery));
      this.isLoading.set(false);
      this.cdr.detectChanges();
    }, 500);
  }

  // 3. Método para carregar Rota do Serviço
  private loadRouteData(id: string) {
    const route = this.routesService.getRouteById(id);

    if (route) {
      // Mapear dados reais da rota + dados simulados de analytics
      this.eventData = {
        id: route.id,
        title: route.title,
        address: route.region ? `Região de ${this.capitalize(route.region)}` : 'Vários locais',
        image: route.img || 'assets/images/png/placeholder.png',
        
        // Dados simulados (Analytics ainda não existem no backend)
        visitorsTotal: Math.floor(Math.random() * 500) + 100, // 100 a 600
        rating: 4.8,
        hours: '24h',
        category: 'Turismo',
        features: ['Guiado', 'Transporte', 'Seguro'],
        dayStat: {
          day: '2º',
          count: Math.floor(Math.random() * 100) + 50
        },
        locationQuery: route.region || 'São Paulo'
      };
    } else {
      // Fallback se não achar (ex: refresh e perdeu estado mockado)
      this.eventData.title = 'Rota não encontrada';
    }
  }

  // 4. Método Mock para Eventos (Mantido como estava)
  private loadEventMock(id: string | null) {
    this.eventData = {
      id: id || '1',
      title: 'Festival de Jazz de Tatuí',
      address: 'Centro de Tatuí - SP',
      image: 'assets/images/jpg/teatro.jpeg',
      visitorsTotal: 355,
      rating: 5,
      hours: '09h00 - 18h00',
      category: 'Cultural',
      features: ['Pet Friendly', 'Acessível'],
      dayStat: {
        day: '2º',
        count: 144
      },
      locationQuery: 'Tatuí, SP' 
    };
  }

  ngOnDestroy(): void {
    this.chartInstance?.destroy();
  }

  goBack(): void {
    this.router.navigate(['/promotor_turistico/inicio']);
  }

  private getSanitizedMapUrl(query: string): SafeResourceUrl {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getRatingStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < Math.floor(rating));
  }

  private capitalize(s: string) {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  private createVisitorsChart(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.chartInstance?.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(0, 180, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    // Dados aleatórios para parecer dinâmico
    const dataPoints = Array.from({length: 7}, () => Math.floor(Math.random() * 100) + 50);

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Dia 7'],
        datasets: [
          {
            label: 'Visitantes',
            data: dataPoints,
            fill: true,
            backgroundColor: gradient,
            borderColor: '#00B4D8',
            borderWidth: 3,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#fff',
            titleColor: '#333',
            bodyColor: '#666',
            borderColor: '#ddd',
            borderWidth: 1,
            displayColors: false,
            callbacks: {
              label: (item) => `${item.parsed.y} visitantes`
            }
          },
        },
        scales: {
          x: { display: false },
          y: { display: false, min: 0 },
        },
      },
    });
  }
}