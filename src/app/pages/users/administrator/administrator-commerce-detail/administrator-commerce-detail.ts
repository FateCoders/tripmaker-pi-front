// src/app/pages/users/administrator/commerce-detail/administrator-commerce-detail.ts

import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, TooltipItem } from 'chart.js/auto'; // Importa o Chart.js
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { HeaderTitle } from '../../../../components/header-title/header-title';
import { CommerceService } from '../../../../services/commerce.service';
import { Commerce } from '../../../../interfaces/commerce';
import { ChipButtonComponent } from '../../../../components/buttons/chip-button/chip-button';

@Component({
  selector: 'app-administrator-commerce-detail',
  standalone: true,
  imports: [
    CommonModule,
    HeaderTitle,
    MatButtonModule,
    MatIconModule,
    ChipButtonComponent,
  ],
  templateUrl: './administrator-commerce-detail.html',
  styleUrl: './administrator-commerce-detail.scss',
})
export class AdministratorCommerceDetail implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private commerceService = inject(CommerceService);
  private sanitizer = inject(DomSanitizer);

  private chartInstance: Chart | undefined;
  private businessSub: Subscription | undefined;

  // ViewChild para o gráfico
  private chartRef: ElementRef<HTMLCanvasElement> | undefined;
  @ViewChild('visitorsChart') set visitorsChart(
    elRef: ElementRef<HTMLCanvasElement> | undefined
  ) {
    if (elRef) {
      this.chartRef = elRef;
      this.createChartIfReady();
    }
  }

  isLoading = signal(true);
  businessData = signal<Commerce | null>(null);
  mapUrl = signal<SafeResourceUrl | null>(null);

  ngOnInit(): void {
    this.loadBusinessData();
  }

  ngOnDestroy(): void {
    this.businessSub?.unsubscribe();
    this.chartInstance?.destroy();
  }

  loadBusinessData(): void {
    const commerceId = this.route.snapshot.paramMap.get('id');
    if (!commerceId) {
      console.error('Nenhum ID de comércio fornecido');
      this.goBack();
      return;
    }

    this.isLoading.set(true);
    this.chartInstance?.destroy(); // Limpa gráfico antigo
    this.chartInstance = undefined;
    this.mapUrl.set(null);

    // Busca o comércio pelo ID da rota
    this.businessSub = this.commerceService.getCommerceById(commerceId).subscribe(
      (data) => {
        if (data) {
          this.businessData.set(data);
          this.mapUrl.set(this.getSanitizedMapUrl(data.location.query));
        } else {
          console.error('Comércio não encontrado');
          this.businessData.set(null);
        }

        this.isLoading.set(false);
        this.cdr.detectChanges(); // Força a detecção
        this.createChartIfReady(); // Tenta criar o gráfico
      },
      (error) => {
        console.error('Erro ao buscar dados do comércio:', error);
        this.isLoading.set(false);
      }
    );
  }

  private getSanitizedMapUrl(query: string): SafeResourceUrl {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getRatingStars(rating: number | undefined): boolean[] {
    if (rating === undefined) return Array(5).fill(false);
    return Array(5)
      .fill(false)
      .map((_, i) => i < rating);
  }

  goBack(): void {
    this.router.navigate(['/administrador/comercios']);
  }

  refreshData(): void {
    console.log('Atualizando dados do comércio...');
    this.loadBusinessData();
  }

  private createChartIfReady(): void {
    if (typeof window !== 'undefined' && this.businessData() && this.chartRef) {
      this.createVisitorsChart(this.chartRef.nativeElement, this.businessData()!);
    }
  }

  // Copiado diretamente de entrepreneur-home.ts
  private createVisitorsChart(canvas: HTMLCanvasElement, data: Commerce): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Falha ao obter o contexto 2D do canvas.');
      return;
    }

    this.chartInstance?.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.5);
    gradient.addColorStop(0, 'rgba(3, 94, 208, 0.4)');
    gradient.addColorStop(1, 'rgba(3, 94, 208, 0)');

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
        datasets: [
          {
            label: 'Visitantes',
            data: [12, 19, 3, 5, 2, 3, 7], // Dados de exemplo (substitua se tiver dados reais)
            fill: true,
            backgroundColor: gradient,
            borderColor: 'var(--primary-color-dark)',
            borderWidth: 2.5,
            tension: 0.4,
            pointBackgroundColor: 'var(--primary-color-dark)',
            pointRadius: 0,
            pointBorderWidth: 0,
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
              color: 'var(--text-color-light)',
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
            ticks: {
              color: 'var(--text-color-light)',
              padding: 10,
            },
          },
        },
      },
    });
  }
}