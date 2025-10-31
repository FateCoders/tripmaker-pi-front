import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  OnDestroy, // 1. Importar OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from '../../../../services/auth.service';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { Router } from '@angular/router';
import {
  Chart,
  TooltipItem,
} from 'chart.js/auto'; // Importação do Chart.js

// Interface para os dados do comércio (baseado no protótipo)
interface BusinessData {
  name: string;
  address: string;
  logoUrl: string;
  visitors: string;
  rating: number;
  priceRange: string;
  hours: string;
  category: string;
  routesCount: number;
  monthlyVisitors: number;
  chartData: {
    labels: string[];
    values: number[];
  };
  mapLocation: {
    query: string;
  };
}

@Component({
  selector: 'app-entrepreneur-home',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatSlideToggleModule,
    FooterUsercomumComponent,
    HeaderTitle,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './entrepreneur-home.html',
  styleUrl: './entrepreneur-home.scss',
})
// 2. Implementar OnDestroy
export class EntrepreneurHome implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);

  private chartInstance: Chart | undefined;

  // 3. Alterar o ViewChild para usar um 'set' accessor
  // Isso garante que o gráfico seja criado assim que o <canvas> entrar no DOM
  private chartRef: ElementRef<HTMLCanvasElement> | undefined;
  @ViewChild('visitorsChart') set visitorsChart(
    elRef: ElementRef<HTMLCanvasElement> | undefined
  ) {
    if (elRef) {
      // O canvas agora existe no DOM
      this.chartRef = elRef;
      this.createChartIfReady(); // Tenta criar o gráfico
    }
  }

  isLoading = true;
  hasBusiness = false;
  businessData: BusinessData | null = null;
  mapEmbedUrl: string | null = null;

  ngOnInit(): void {
    this.checkBusinessStatus();
  }

  // 4. Implementar ngOnDestroy para limpar o gráfico ao sair da tela
  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  checkBusinessStatus(): void {
    this.isLoading = true;
    const user = this.authService.getCurrentUser();

    // Simulação de API
    setTimeout(() => {
      if (user && user.email === 'empreendedor@email.com') {
        this.hasBusiness = true;
        this.businessData = {
          name: 'Nome do comercio',
          address: 'Praça da Matriz, Tatuí - SP',
          logoUrl: 'assets/images/png/local-entrepreneur.png',
          visitors: '2.5K',
          rating: 5,
          priceRange: '$$ - $$$',
          hours: '00h00 - 00h00',
          category: 'Comércio',
          routesCount: 13,
          monthlyVisitors: 235,
          chartData: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            values: [65, 59, 80, 81, 56, 120],
          },
          mapLocation: {
            query: 'Conservatório de Tatuí, Tatuí - SP',
          },
        };
        this.mapEmbedUrl = this.getGoogleMapsEmbedUrl(
          this.businessData.mapLocation.query
        );
      } else {
        this.hasBusiness = false;
      }
      this.isLoading = false;

      // 5. Tenta criar o gráfico *depois* que os dados chegarem
      this.createChartIfReady();
    }, 500);
  }

  // 6. Novo helper para centralizar a lógica de criação
  private createChartIfReady(): void {
    // Só cria o gráfico se:
    // 1. Não estiver no servidor (SSR)
    // 2. Tiver um negócio (dados carregados)
    // 3. O elemento <canvas> (#visitorsChart) já estiver renderizado e no chartRef
    if (typeof window !== 'undefined' && this.hasBusiness && this.chartRef) {
      this.createVisitorsChart();
    }
  }

  private createVisitorsChart(): void {
    if (!this.chartRef || !this.businessData) return; // Checagem dupla

    const canvas = this.chartRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Falha ao obter o contexto 2D do canvas.');
      return; // Parar se o contexto não estiver disponível
    }

    // Destrói gráfico anterior se existir (para o caso de refresh)
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    // Criação do Gradiente
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.5);
    gradient.addColorStop(0, 'rgba(3, 94, 208, 0.4)'); // Cor primária com opacidade
    gradient.addColorStop(1, 'rgba(3, 94, 208, 0)'); // Transparente

    // Configuração do Gráfico
    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.businessData.chartData.labels,
        datasets: [
          {
            label: 'Visitantes',
            data: this.businessData.chartData.values,
            fill: true, // Preencher área
            backgroundColor: gradient, // Aplicar gradiente
            borderColor: 'var(--primary-color-dark)',
            borderWidth: 2.5,
            tension: 0.4, // Linha curvada
            // Estilo dos Pontos
            pointBackgroundColor: 'var(--primary-color-dark)',
            pointRadius: 0, // Pontos invisíveis por padrão
            pointBorderWidth: 0,
            pointHoverRadius: 6, // Ponto aparece no hover
            pointHoverBackgroundColor: 'var(--primary-color-dark)',
            pointHoverBorderColor: 'var(--white-color)',
            pointHoverBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // Configuração de Interatividade (Tooltips)
        interaction: {
          mode: 'index', // Mostrar tooltip para o índice X mais próximo
          intersect: false, // Ativar tooltip mesmo sem tocar o ponto exato
        },
        plugins: {
          legend: {
            display: false, // Esconder a legenda
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'var(--text-color-dark)',
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 12 },
            padding: 10,
            caretPadding: 10,
            cornerRadius: 8,
            displayColors: false, // Esconder o quadradinho de cor
            callbacks: {
              // Formatar o texto do tooltip
              label: (context: TooltipItem<'line'>) => {
                return `${context.parsed.y} visitantes`;
              },
            },
          },
        },
        // Configuração dos Eixos (Scales)
        scales: {
          x: {
            grid: {
              display: false, // Remover linhas de grade verticais
            },
            ticks: {
              color: 'var(--text-color-light)',
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)', // Linhas de grade horizontais bem claras
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

  private getGoogleMapsEmbedUrl(query: string): string {
    const apiKey = 'SUA_API_KEY_AQUI';
    if (apiKey === 'SUA_API_KEY_AQUI') {
      console.warn(
        'Substitua "SUA_API_KEY_AQUI" pela sua chave da API do Google Maps para o mapa funcionar.'
      );
      // Retorna uma query genérica caso a chave não esteja definida
      return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58673.07921890356!2d-47.88725831102927!3d-23.3512140669299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c5d8e7b165296d%3A0x6a0a09e0a80e1c31!2sTatu%C3%AD%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1730219812345!5m2!1spt-BR!2sbr?q=Tatuí, SP';
    }
    const encodedQuery = encodeURIComponent(query);
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedQuery}`;
  }

  get ratingStars(): boolean[] {
    if (!this.businessData) return [];
    return Array(5)
      .fill(false)
      .map((_, i) => i < this.businessData!.rating);
  }

  navigateToRegisterCommerce(): void {
    console.log('Navegando para o cadastro de comércio...');
    // Exemplo: this.router.navigate(['/empreendedor/cadastrar-comercio']);
  }

  refreshData(): void {
    console.log('Atualizando dados do comércio...');
    this.checkBusinessStatus();
  }
}