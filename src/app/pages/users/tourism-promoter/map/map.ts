import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { SearchBarComponent } from '../../../../components/search-bar/search-bar.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../../environments/environment';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tourism-promoter-map',
  standalone: true,
  imports: [CommonModule, MatIconModule, FooterUsercomumComponent, SearchBarComponent],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class TourismPromoterMapComponent implements OnDestroy {
  private readonly DEFAULT_LOCATION = 'Tatuí, SP';
  private readonly GOOGLE_MAPS_API_KEY = environment.googleMapsApiKey;

  searchTerm = '';
  mapUrl: SafeResourceUrl;
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private sanitizer: DomSanitizer) {
    this.mapUrl = this.buildMapUrl(this.DEFAULT_LOCATION);

    this.searchSubject
      .pipe(debounceTime(3000), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((term) => {
        const query = term?.trim() ? term : this.DEFAULT_LOCATION;
        this.mapUrl = this.buildMapUrl(query);
      });
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.searchSubject.next(term);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.searchSubject.complete();
  }

  private buildMapUrl(query: string): SafeResourceUrl {
    const base = 'https://www.google.com/maps/embed/v1/search';
    const params = `?key=${this.GOOGLE_MAPS_API_KEY}&language=pt-BR&q=${encodeURIComponent(query)}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(base + params);
  }
}
