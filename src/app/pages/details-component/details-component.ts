import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { FooterUsercomumComponent } from '../../components/public/bottom-menu/bottom-menu.component';
import { Chip } from '../../components/chip/chip';
import { CardCarouselComponent } from '../../components/card-carousel/card-carousel';
import { RouteCardItem } from '../../interfaces/route-card-item';
import { ImageCarouselComponent } from '../../components/image-carousel/image-carousel';
import { QrCodeDialog } from '../../components/qr-code-dialog/qr-code-dialog';
import { NotificationService } from '../../services/notification-service';

@Component({
  selector: 'app-details-component',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    FooterUsercomumComponent,
    Chip,
    CardCarouselComponent,
    ImageCarouselComponent,
  ],
  templateUrl: './details-component.html',
  styleUrl: './details-component.scss',
})
export class DetailsComponent implements OnInit {
  @Input() isEvent = false;
  @Input() isRoute = false;

  private location = inject(Location);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private notificationService = inject(NotificationService);

  contentId: string | null = null;
  
  // Estado de presença
  hasPresenceMarked = signal(false);

  // Dados
  routeDetails = {
    headerImage: 'assets/images/jpg/fundo-landing.jpg',
    title: 'Carregando...',
    duration: '',
    price: '',
    description: '',
    tags: [] as any[]
  };
  
  routePoints: RouteCardItem[] = [];
  eventImagesUrls: string[] = [];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.contentId = params.get('id');
      
      // Detectar tipo pela URL antes de carregar dados
      const secondSegment = this.activatedRoute.snapshot.url[1]?.path ?? '';
      
      // CORREÇÃO: Verifica se a URL contém 'evento' ou 'eventos'
      if (secondSegment.includes('evento')) {
        this.isEvent = true;
        this.isRoute = false;
      } else if (secondSegment.includes('rota')) {
        this.isRoute = true;
        this.isEvent = false;
      }

      this.loadDataMock(this.contentId);
    });
  }

  loadDataMock(id: string | null) {
    if (this.isEvent) {
      // MOCK: Dados de Evento
      this.routeDetails = {
        headerImage: 'assets/images/jpg/teatro.jpeg',
        title: 'Encontro de Música Popular',
        duration: '11h30 - 18h30',
        price: 'Entrada Franca',
        description: 'Venha prestigiar apresentações de artistas locais e estudantes do Conservatório de Tatuí em uma tarde de celebração à música popular brasileira.',
        tags: [{ label: 'Cultural', icon: 'theater_comedy' }, { label: 'Música', icon: 'music_note' }]
      };
      // Preenchendo as imagens para o carrossel
      this.eventImagesUrls = [
        'assets/images/jpg/teatro.jpeg', 
        'assets/images/png/conservatorio.png',
        'assets/images/jpg/exposicao-arte.jpg'
      ];
      
    } else {
      // MOCK: Dados de Rota
      this.routeDetails = {
        headerImage: 'assets/images/png/conservatorio.png',
        title: 'Rota Cultural de Tatuí',
        duration: '4 horas',
        price: 'R$ 50,00',
        description: 'Um passeio pelos principais pontos históricos da cidade, incluindo visitas guiadas e degustação gastronômica.',
        tags: [{ label: 'História', icon: 'history' }, { label: 'Família', icon: 'family_restroom' }]
      };
      
      // Pontos para o CardCarousel
      this.routePoints = [
        {
          id: 'p1',
          title: 'Museu Histórico',
          image: 'assets/images/jpg/exposicao-arte.jpg',
          category: 'Cultura',
          details: 'Acervo completo da cidade.',
          icons: ['museum']
        },
        {
          id: 'p2',
          title: 'Praça da Matriz',
          image: 'assets/images/png/pattern-1.png',
          category: 'Lazer',
          details: 'Ponto de encontro central.',
          icons: ['park']
        },
        {
          id: 'p3',
          title: 'Teatro Procópio',
          image: 'assets/images/jpg/teatro.jpeg',
          category: 'Teatro',
          details: 'Apresentações locais.',
          icons: ['theater_comedy']
        }
      ];
    }
  }

  goBack(): void {
    this.location.back();
  }

  saveRoute(): void {
    this.notificationService.open('Rota salva com sucesso!', 'OK', 'success');
    this.router.navigate(['/viajante/inicio']);
  }

  markPresence(): void {
    this.hasPresenceMarked.set(true);
    this.notificationService.open('Presença confirmada! Seu QR Code está disponível.', 'OK', 'success');
  }

  showQrCode(): void {
    this.dialog.open(QrCodeDialog, {
      width: '100%',
      maxWidth: '100vw',
      height: '100%',
      maxHeight: '100vh',
      panelClass: 'fullscreen-dialog'
    });
  }

  toggleFavorite(): void {
    console.log('Favorito clicado!');
  }
  
  // Métodos do output do carrossel
  onAddPoint(item: any) {}
  onViewPoint(item: any) {}
}