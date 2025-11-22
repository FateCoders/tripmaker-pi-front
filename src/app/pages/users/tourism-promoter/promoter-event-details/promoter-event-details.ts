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

  // Textos Dinâmicos baseados no tipo
  pageTitle = computed(() => this.isRoute() ? 'Rota' : 'Evento');
  entityNameLabel = computed(() => this.isRoute() ? 'Nome da Rota' : 'Nome do Evento');
  statCardText = computed(() => this.isRoute() ? 'sua Rota' : 'seu Evento');

  // Dados Mockados
  eventData = {
    id: '1',
    title: 'Festival de Verão / Rota do Sol', // Título genérico para exemplo
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

  ngOnInit(): void {
    // 1. Detectar se é Rota ou Evento baseado na URL
    // A URL é do tipo /promotor_turistico/rota/:id ou /promotor_turistico/evento/:id
    const pathSegment = this.route.snapshot.url[1]?.path; 
    this.isRoute.set(pathSegment === 'rota');

    // Simula carregamento
    setTimeout(() => {
      // Ajusta dados mockados dependendo do tipo (opcional)
      if (this.isRoute()) {
        this.eventData.title = "Rota Histórica de Tatuí";
      } else {
        this.eventData.title = "Festival de Jazz";
      }

      this.mapUrl.set(this.getSanitizedMapUrl(this.eventData.locationQuery));
      this.isLoading.set(false);
      this.cdr.detectChanges();
    }, 500);
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
    return Array(5).fill(false).map((_, i) => i < rating);
  }

  private createVisitorsChart(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.chartInstance?.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(0, 180, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Dia 7'],
        datasets: [
          {
            label: 'Visitantes',
            data: [50, 80, 60, 90, 120, 144, 130],
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