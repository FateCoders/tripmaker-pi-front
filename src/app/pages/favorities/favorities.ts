import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { HeaderTitle } from '../../components/header-title/header-title';
import { FooterUsercomumComponent } from '../../components/public/bottom-menu/bottom-menu.component';
import { MapItem, MapItemCardComponent } from '../../components/map-item-card/map-item-card';
import { Observable, switchMap, of, BehaviorSubject } from 'rxjs';
import { FavoritesService } from '../../services/favorities-service';
import { Router } from '@angular/router';

type FavoriteTab = 'Roteiros' | 'Rotas' | 'Eventos';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    HeaderTitle,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MapItemCardComponent,
  ],
  templateUrl: './favorities.html',
  styleUrls: ['./favorities.scss'],
})
export class FavoritesComponent implements OnInit {
  private favoritesService = inject(FavoritesService);
  private router = inject(Router);

  activeTab$ = new BehaviorSubject<FavoriteTab>('Eventos');

  favoriteItems$!: Observable<MapItem[]>;

  tabs: FavoriteTab[] = ['Roteiros', 'Rotas', 'Eventos'];

  ngOnInit(): void {
    this.favoriteItems$ = this.activeTab$.pipe(
      switchMap((tab) => this.favoritesService.getFavoritesByTab(tab))
    );
  }

  onTabChange(event: any): void {
    const newTab = this.tabs[event.index];
    this.activeTab$.next(newTab);
  }

  onItemClick(item: MapItem): void {
    console.log('Detalhes do favorito:', item.title);
  }

  onFilterChange(): void {
    console.log('Filtro/Ordenação alterada (TODO: Implementar lógica de ordenação)');
    this.activeTab$.next(this.activeTab$.value);
  }

  goBack(): void {
    this.router.navigate(['/viajante/perfil']);
  }
}
