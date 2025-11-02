import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { HeaderTitle } from '../../components/header-title/header-title';
import { RouteCardItem } from '../../interfaces/route-card-item';
import { RouteSummaryItemComponent } from '../../components/route-summary-item/route-summary-item';
import { GoogleMapIframeComponent } from '../../components/google-map-iframe/google-map-iframe';

@Component({
  selector: 'app-route-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    HeaderTitle,
    RouteSummaryItemComponent,
    GoogleMapIframeComponent,
  ],
  templateUrl: './route-summary.html',
  styleUrls: ['./route-summary.scss'],
})
export class RouteSummaryComponent implements OnInit {
  private router = inject(Router);

  routeItems: RouteCardItem[] = [];

  mapUrl: string = '';
  private readonly GOOGLE_MAPS_API_KEY = 'SUA_API';

  ngOnInit(): void {
    this.routeItems = this.getMockSummaryItems();

    this.mapUrl = this.buildDirectionsUrl(this.routeItems);
  }

  private buildDirectionsUrl(items: RouteCardItem[]): string {
    if (items.length === 0) {
      return `https://www.google.com/maps/embed/v1/place?key=${this.GOOGLE_MAPS_API_KEY}&q=Itapetininga+SP`;
    }

    const encode = (str: string) => encodeURIComponent(str).replace(/%20/g, '+');

    const origin = encode(`${items[0].title}, ${items[0].category}`);
    let destination = origin;
    let waypoints = '';

    if (items.length > 1) {
      const lastItem = items[items.length - 1];
      destination = encode(`${lastItem.title}, ${lastItem.category}`);
    }

    if (items.length > 2) {
      waypoints = items
        .slice(1, -1)
        .map((item) => encode(`${item.title}, ${item.category}`))
        .join('|');
    }

    return `https://www.google.com/maps/embed/v1/directions?key=${this.GOOGLE_MAPS_API_KEY}&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;
  }

  goBack(): void {
    this.router.navigate(['/viajante/roteiros/chat']);
  }
  onRemoveItem(itemToRemove: RouteCardItem): void {
    console.log('Removendo item:', itemToRemove.id);
    this.routeItems = this.routeItems.filter((item) => item.id !== itemToRemove.id);
    this.mapUrl = this.buildDirectionsUrl(this.routeItems);
  }
  onAdvance(): void {
    console.log('Avançando para a tela de salvar...');
    this.router.navigate(['/viajante/roteiros/salvar']);
  }
  onExpandMap(): void {
    console.log('Expandir mapa');
  }
  private getMockSummaryItems(): RouteCardItem[] {
    //
    return [
      {
        id: 'evento-x-1',
        image: 'assets/images/jpg/teatro.jpeg',
        title: 'Cachoeira do Barro Preto',
        category: 'Boituva-SP',
        details: 'Trilha leve...',
        icons: ['store', 'stairs', 'accessible', 'hotel', 'directions_bus'],
      },
      {
        id: 'evento-y-1',
        image: 'assets/images/jpg/exposicao-arte.jpg',
        title: 'Exposição de Arte',
        category: 'Itapetininga-SP',
        details: 'Artistas locais...',
        icons: ['store', 'stairs', 'accessible', 'hotel', 'directions_bus'],
      },
      {
        id: 'evento-x-2',
        image: 'assets/images/jpg/fundo-landing.jpg',
        title: 'Voo de Balão',
        category: 'Boituva-SP',
        details: 'Experiência inesquecível...',
        icons: ['store', 'stairs', 'accessible', 'hotel', 'directions_bus'],
      },
    ];
  }
}
