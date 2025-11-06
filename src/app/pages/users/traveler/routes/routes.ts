import { Component, OnInit, inject } from '@angular/core'; // Adicionado OnInit
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  MapItem,
  MapItemCardComponent,
} from '../../../../components/map-item-card/map-item-card';
import { HeaderTitle } from "../../../../components/header-title/header-title";
import { FooterUsercomumComponent } from "../../../../components/public/bottom-menu/bottom-menu.component";
import { RoutesService } from '../../../../services/routes.service'; // Importado

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MapItemCardComponent,
    HeaderTitle,
    FooterUsercomumComponent
],
  templateUrl: './routes.html',
  styleUrls: ['./routes.scss'],
})
export class TravelerRoutes implements OnInit { // Implementado OnInit
  private router = inject(Router);
  private routesService = inject(RoutesService); // Injetado
  
  savedRoutes: MapItem[] = []; // Inicializado como vazio

  ngOnInit(): void {
    // Carrega roteiros salvos ao inicializar
    this.savedRoutes = this.routesService.getSavedRoutes();
  }

  onRouteClick(route: MapItem): void {
    console.log('Navegar para detalhes do roteiro (TODO):', route.id);
  }

  createNewRoute(): void {
    this.router.navigate(['/viajante/roteiros/chat']);
  }
}
