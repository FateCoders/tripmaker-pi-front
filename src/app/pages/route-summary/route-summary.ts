import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { HeaderTitle } from '../../components/header-title/header-title';
import { RouteCardItem } from '../../interfaces/route-card-item';
import { RouteSummaryItemComponent } from '../../components/route-summary-item/route-summary-item';
import { GoogleMapIframeComponent } from '../../components/google-map-iframe/google-map-iframe';
import { RoutesService } from '../../services/routes.service';
import { environment } from '../../../environments/environment.prod';

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
  private routesService = inject(RoutesService);
  private sanitizer = inject(DomSanitizer);

  routeItems: RouteCardItem[] = [];

  mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

  @HostBinding('class.map-expanded') isMapExpanded: boolean = false;

  private readonly GOOGLE_MAPS_API_KEY = environment.googleMapsApiKey;

  ngOnInit(): void {
    this.routeItems = this.routesService.loadCurrentRoute();

    if (this.routeItems.length > 0) {
      this.mapUrl = this.buildDirectionsUrl(this.routeItems);
    } else {
      this.router.navigate(['/viajante/roteiros/chat']);
    }
  }

  private buildDirectionsUrl(items: RouteCardItem[]): SafeResourceUrl {
    if (items.length === 0) {
      const genericUrl = `https://www.google.com/maps/embed/v1/place?key=${this.GOOGLE_MAPS_API_KEY}&q=Interior+de+São+Paulo`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(genericUrl);
    }

    const encode = (str: string) => encodeURIComponent(str).replace(/%20/g, '+');

    const getLocationString = (item: RouteCardItem) => encode(`${item.title}, ${item.category}`);

    const origin = getLocationString(items[0]);
    let destination = origin;
    let waypoints = '';

    if (items.length > 1) {
      const lastItem = items[items.length - 1];
      destination = getLocationString(lastItem);

      if (items.length > 2) {
        waypoints = items.slice(1, -1).map(getLocationString).join('|');
      }
    }

    let url = `https://www.google.com/maps/embed/v1/directions?key=${this.GOOGLE_MAPS_API_KEY}&origin=${origin}&destination=${destination}`;
    if (waypoints) {
      url += `&waypoints=${waypoints}`;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goBack(): void {
    this.router.navigate(['/viajante/roteiros/chat']);
  }

  onRemoveItem(itemToRemove: RouteCardItem): void {
    console.log('Removendo item:', itemToRemove.id);
    this.routeItems = this.routeItems.filter((item) => item.id !== itemToRemove.id);

    this.routesService.saveCurrentRoute(this.routeItems);
    this.mapUrl = this.buildDirectionsUrl(this.routeItems);

    if (this.routeItems.length === 0) {
      this.routesService.clearCurrentRoute();
    }
  }

  onAdvance(): void {
    console.log('Avançando para a tela de salvar...');

    this.router.navigate(['/viajante/roteiros/salvar']);
  }

  onExpandMap(): void {
    this.isMapExpanded = !this.isMapExpanded;
  }
}
