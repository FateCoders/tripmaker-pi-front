import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  MapItem,
  MapItemCardComponent,
} from '../../../../components/map-item-card/map-item-card';
import { HeaderTitle } from "../../../../components/header-title/header-title";

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MapItemCardComponent,
    HeaderTitle
],
  templateUrl: './routes.html',
  styleUrls: ['./routes.scss'],
})
export class TravelerRoutes {
  savedRoutes: MapItem[] = [
    {
      id: 'roteiro-1',
      image: 'assets/images/jpg/teatro.jpeg',
      title: 'Roteiro de 1 dia em Boituva',
      category: 'Aventura',
      rating: 4.8,
      distance: '3 eventos',
      details: 'Um dia radical com paraquedismo e balonismo.',
    },
    {
      id: 'roteiro-2',
      image: 'assets/images/png/conservatorio.png',
      title: 'Fim de semana em Tatuí',
      category: 'Cultural',
      rating: 4.5,
      distance: '5 eventos',
      details: 'Conheça a capital da música e seus arredores.',
    },
  ];

  constructor(private router: Router) {}

  onRouteClick(route: MapItem): void {
    console.log('Navegar para detalhes:', route.id);
  }

  createNewRoute(): void {
    this.router.navigate(['/viajante/roteiros/chat']);
  }
}