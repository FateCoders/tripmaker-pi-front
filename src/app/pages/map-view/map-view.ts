import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MapItem, MapItemCardComponent } from '../../components/map-item-card/map-item-card';
import { FooterUsercomumComponent } from '../../components/public/bottom-menu/bottom-menu.component';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    FooterUsercomumComponent,
    MapItemCardComponent,
  ],
  templateUrl: './map-view.html',
  styleUrls: ['./map-view.scss'],
})
export class MapViewComponent {
  eventItems: MapItem[] = [
    {
      id: 'evento-x-1',
      image: 'assets/images/jpg/teatro.jpeg',
      title: 'Evento X',
      category: '$$',
      rating: 5,
      distance: '1.2 miles away',
      details: 'Supporting line text lorem ipsum dolo...',
    },
    {
      id: 'evento-x-2',
      image: 'assets/images/png/conservatorio.png',
      title: 'Evento X',
      category: '$$',
      rating: 5,
      distance: '1.2 miles away',
      details: 'Supporting line text lorem ipsum dolo...',
    },
    {
      id: 'evento-y-1',
      image: 'assets/images/jpg/exposicao-arte.jpg',
      title: 'Evento Y',
      category: '$$',
      rating: 5,
      distance: '1.8 miles away',
      details: 'Supporting line text lorem ipsum dolo...',
    },
  ];

  routeItems: MapItem[] = []; // Deixando vazio por enquanto

  constructor(private router: Router) {}

  onItemClick(item: MapItem) {
    // Navega para a página de detalhes quando um item é clicado
    this.router.navigate(['/eventos', item.id]);
  }
}
