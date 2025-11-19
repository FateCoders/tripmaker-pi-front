import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { SearchBarComponent } from '../../../../components/search-bar/search-bar.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-tourism-promoter-map',
  standalone: true,
  imports: [CommonModule, MatIconModule, FooterUsercomumComponent, SearchBarComponent],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class TourismPromoterMapComponent {
  searchTerm = '';
  mapUrl: SafeResourceUrl;
  private readonly GOOGLE_MAPS_API_KEY = environment.googleMapsApiKey;

  constructor(private router: Router, private sanitizer: DomSanitizer) {
    this.mapUrl = this.buildMapUrl('Tatuí, SP');
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.mapUrl = this.buildMapUrl(term || 'Tatuí, SP');
  }

  private buildMapUrl(query: string): SafeResourceUrl {
    const base = 'https://www.google.com/maps/embed/v1/search';
    const params = `?key=${this.GOOGLE_MAPS_API_KEY}&language=pt-BR&q=${encodeURIComponent(query)}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(base + params);
  }
}
