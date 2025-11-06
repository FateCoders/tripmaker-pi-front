import { Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouteCardItem } from '../../interfaces/route-card-item';
import { environment } from '../../../environments/environment';

/**
 * Componente para renderizar um iframe do Google Maps.
 * Pode ser usado para exibir um ponto fixo (usando mapSrcUrl) ou uma rota complexa (usando routeItems).
 */
@Component({
  selector: 'app-google-map-iframe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './google-map-iframe.html',
  styleUrls: ['./google-map-iframe.scss'],
})
export class GoogleMapIframeComponent implements OnChanges {
  private sanitizer = inject(DomSanitizer);

  @Input() mapSrcUrl: string = '';

  @Input() routeItems: RouteCardItem[] | null = null;

  @Input() height: string = '100%';

  safeMapUrl: SafeResourceUrl | null = null;
  private readonly GOOGLE_MAPS_API_KEY = environment.googleMapsApiKey;
  private readonly DEFAULT_LOCATION = 'Interior de São Paulo';

  ngOnChanges(): void {
    if (this.routeItems && this.routeItems.length > 0) {
      this.safeMapUrl = this.buildDirectionsUrl(this.routeItems);
    } else if (this.mapSrcUrl) {
      this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapSrcUrl);
    } else {
      this.safeMapUrl = this.buildPlaceUrl(this.DEFAULT_LOCATION);
    }
  }

  /**
   * Constrói a URL do Google Maps Directions para o roteiro.
   */
  private buildDirectionsUrl(items: RouteCardItem[]): SafeResourceUrl {
    if (items.length === 0) {
      return this.buildPlaceUrl(this.DEFAULT_LOCATION);
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

    let url = `https://www.google.com/maps/embed/v1/directions?key=${this.GOOGLE_MAPS_API_KEY}&origin=${origin}&destination=${destination}`;

    if (waypoints) {
      url += `&waypoints=${waypoints}`;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private buildPlaceUrl(query: string): SafeResourceUrl {
    const encodedQuery = encodeURIComponent(query).replace(/%20/g, '+');
    const url = `https://www.google.com/maps/embed/v1/place?key=${this.GOOGLE_MAPS_API_KEY}&q=${encodedQuery}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
