// app/pages/routes-datais/routes-datais.ts
// [CONTEÚDO COMPLETO E MODIFICADO]

import { Component, inject, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FooterUsercomumComponent } from '../../components/public/bottom-menu/bottom-menu.component';
import { Chip } from '../../components/chip/chip';
import { CardCarouselComponent } from '../../components/card-carousel/card-carousel';
import { RouteCardItem } from '../../interfaces/route-card-item';
// 2. AuthService removido

@Component({
  selector: 'app-routes-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    FooterUsercomumComponent,
    Chip,
    CardCarouselComponent,
  ],
  templateUrl: './routes-details.html',
  styleUrl: './routes-details.scss',
})
export class RoutesDetailsComponents {
  @Input() isEvent:boolean = false;
  @Input() isRoute:boolean = false;
  private location = inject(Location);
  private router = inject(Router);

  @Input() showActionButtons: boolean = false;

  routeDetails = {
    title: 'Passeio Cultural pela Capital da Música.',
    headerImage: 'assets/images/jpg/fundo-landing.jpg',
    description:
      'Descubra os encantos de Tatuí, conhecida como a Capital da Música, neste roteiro cultural imersivo. Visite museus, teatros e sinta a atmosfera artística da cidade.',
    duration: '7h ~ 7h30m',
    price: '$ - $$',
    tags: [
      { label: 'Hospedaria', icon: 'hotel' },
      { label: 'Comércio', icon: 'store' },
      { label: 'Restaurante', icon: 'restaurant' },
    ],
  };

  routePoints: RouteCardItem[] = [
    {
      id: 'ponto-1',
      image: 'assets/images/png/conservatorio.png',
      title: 'Museu Paulo Setúbal',
      category: 'Tatuí-SP',
      duration: '1h30m',
      details: 'Exposição gratuita sobre elementos históricos da ci...',
      icons: ['accessible'],
      rating: 4.8,
      distance: '$ - $$',
    },
    {
      id: 'ponto-2',
      image: 'assets/images/jpg/teatro.jpeg',
      title: 'Teatro Procopio Ferreira',
      category: 'Tatuí-SP',
      duration: '1h30m',
      details: 'Restaurante espaçoso e informal serve churrasco d...',
      icons: ['accessible', 'restaurant', 'wc'],
      rating: 4.5,
      distance: '$$ - $$$',
    },
    {
      id: 'ponto-3',
      image: 'assets/images/jpg/exposicao-arte.jpg',
      title: 'Centro Cultural',
      category: 'Tatuí-SP',
      duration: '2h00m',
      details: 'Eventos e exposições de arte locais.',
      icons: ['accessible', 'palette'],
      rating: 4.6,
      distance: '$$',
    },
  ];

  goBack(): void {
    this.location.back();
  }

  saveRoute(): void {
    console.log('Rota salva!');
    this.router.navigate(['/viajante/roteiros/salvar']);
  }

  toggleFavorite(): void {
    console.log('Favorito clicado!');
  }
}
