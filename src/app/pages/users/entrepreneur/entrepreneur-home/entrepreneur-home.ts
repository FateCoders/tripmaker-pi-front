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
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { Chart, TooltipItem } from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { CommerceService } from '../../../../services/commerce.service';
import { AuthService } from '../../../../services/auth.service'; // Importar AuthService
import { Commerce } from '../../../../interfaces/commerce';
import { ChipButtonComponent } from '../../../../components/buttons/chip-button/chip-button';

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
    ChipButtonComponent
  ],
  templateUrl: './entrepreneur-home.html',
  styleUrl: './entrepreneur-home.scss',
})
export class EntrepreneurHome implements OnInit, OnDestroy {
  private commerceService = inject(CommerceService);
  private authService = inject(AuthService); // Injetar
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private sanitizer = inject(DomSanitizer);

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
  mapUrl = signal<SafeResourceUrl | null>(null);

  ngOnInit(): void {
    this.loadBusinessData();
  }

  ngOnDestroy(): void {
    this.businessSub?.unsubscribe();
    this.chartInstance?.destroy();
  }

  loadBusinessData(): void {
    const user = this.authService.getCurrentUser();

    if (!user || !user.id) {
      console.error('Usuário não autenticado');
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.chartInstance?.destroy();
    this.chartInstance = undefined;
    this.mapUrl.set(null);

    // Passamos o ID do usuário para garantir que pegamos um comércio DELE
    this.businessSub = this.commerceService.getActiveCommerce(user.id).subscribe(
      (data) => {
        if (data) {
          this.businessData = data;
          this.hasBusiness = true;
          this.mapUrl.set(this.getSanitizedMapUrl(data.location.query));
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

  private getSanitizedMapUrl(query: string): SafeResourceUrl {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  get ratingStars(): boolean[] {
    if (!this.businessData) return [];
    return Array(5)
      .fill(false)
      .map((_, i) => i < this.businessData!.rating);
  }

  navigateToRegisterCommerce(): void {
    this.router.navigate(['/empreendedor/comercios/cadastro']);
  }

  refreshData(): void {
    console.log('Atualizando dados do comércio...');
    this.loadBusinessData();
  }

  // ... (createChartIfReady, createVisitorsChart e navigateToReviews permanecem iguais)

  private createChartIfReady(): void {
    if (typeof window !== 'undefined' && this.hasBusiness && this.chartRef && this.businessData) {
      this.createVisitorsChart(this.chartRef.nativeElement, this.businessData);
    }
  }

  private createVisitorsChart(canvas: HTMLCanvasElement, data: Commerce): void {
    // ... (mesmo código do anterior)
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.chartInstance?.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.5);
    gradient.addColorStop(0, 'rgba(3, 94, 208, 0.4)');
    gradient.addColorStop(1, 'rgba(3, 94, 208, 0)');

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
        datasets: [{
          label: 'Visitantes',
          data: [12, 19, 3, 5, 2, 3, 7],
          fill: true,
          backgroundColor: gradient,
          borderColor: 'var(--primary-color-dark)',
          borderWidth: 2.5,
          tension: 0.4,
          pointBackgroundColor: 'var(--primary-color-dark)',
          pointRadius: 0,
          pointBorderWidth: 0,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } } }
      }
    });
  }

  navigateToReviews(): void {
    if (this.businessData) {
      this.router.navigate(['/empreendedor/avaliacoes', this.businessData.id]);
    }
  }
}