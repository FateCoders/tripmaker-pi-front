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
import { Router } from '@angular/router';
import { Chart, TooltipItem } from 'chart.js/auto';
import { Subscription } from 'rxjs';

import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { CommerceService } from '../../../../services/commerce.service';
import { Commerce } from '../../../../interfaces/commerce';

@Component({
  selector: 'app-entrepreneur-home',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    FooterUsercomumComponent,
    HeaderTitle,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './entrepreneur-home.html',
  styleUrl: './entrepreneur-home.scss',
})
export class EntrepreneurHome implements OnInit, OnDestroy {
  private commerceService = inject(CommerceService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef)

  private businessSub: Subscription | undefined;
  private chartInstance: Chart | undefined;

  private chartRef: ElementRef<HTMLCanvasElement> | undefined;
  @ViewChild('visitorsChart') set visitorsChart(
    elRef: ElementRef<HTMLCanvasElement> | undefined
  ) {
    if (elRef) {
      this.chartRef = elRef;
      this.createChartIfReady()
    }
  }

  isLoading = true;
  hasBusiness = false;
  businessData: Commerce | null = null;

  ngOnInit(): void {
    this.loadBusinessData();
  }

  ngOnDestroy(): void {
    this.businessSub?.unsubscribe();
    this.chartInstance?.destroy();
  }

  /**
   * Carrega os dados do comércio a partir do CommerceService.
   */
  loadBusinessData(): void {
    this.isLoading = true;
    this.businessSub = this.commerceService.getCommerceForUser().subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.businessData = data[0];
          this.hasBusiness = true;
        } else {
          this.businessData = null;
          this.hasBusiness = false;
        }

        this.isLoading = false;

        this.cdr.detectChanges();

        this.createChartIfReady();
      },
      (error) => {
        console.error('Erro ao buscar dados do comércio:', error);
        this.isLoading = false;
        this.hasBusiness = false;
      }
    );
  }


  /**
   * Getter para calcular as estrelas de avaliação.
   */
  get ratingStars(): boolean[] {
    if (!this.businessData) return [];
    return Array(5)
      .fill(false)
      .map((_, i) => i < this.businessData!.rating);
  }

  /**
   * Navega para a página de cadastro de comércio.
   */
  navigateToRegisterCommerce(): void {
    console.log('Navegando para o cadastro de comércio...');
  }

  /**
   * Atualiza os dados do comércio.
   */
  refreshData(): void {
    console.log('Atualizando dados do comércio...');
    this.loadBusinessData();
  }


  /**
   * Verifica se os dados e o canvas estão prontos para criar o gráfico.
   */
  private createChartIfReady(): void {
    if (typeof window !== 'undefined' && this.hasBusiness && this.chartRef && this.businessData) {
      this.createVisitorsChart(this.chartRef.nativeElement, this.businessData);
    }
  }

  /**
   * Cria a instância do Chart.js.
   */
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
        datasets: [
          {
            label: 'Visitantes',
            data: Array.isArray(data.monthlyVisitors) ? data.monthlyVisitors : [],
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