// app/pages/users/tourism-promoter/tourism-promoter-home/tourism-promoter-home.ts
// [CONTEÚDO COMPLETO E MODIFICADO]

import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RoutesService } from '../../../../services/routes.service';
import { ListView } from '../../../../components/list-view/list-view';
import { TabsList } from '../../../../components/tabs-list/tabs-list';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { TabsListCard } from '../../../../models/tabs-list-card';
import { TabsSection } from '../../../../models/tabs-section';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Chip } from '../../../../components/chip/chip';

@Component({
  selector: 'app-tourism-promoter-home',
  imports: [
    CommonModule,
    FooterUsercomumComponent,
    ListView,
    HeaderTitle,
    TabsList,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    Chip,
  ],
  templateUrl: './tourism-promoter-home.html',
  styleUrl: './tourism-promoter-home.scss',
})
export class TourismPromoterHome implements OnInit {
  private routesService = inject(RoutesService);
  private router = inject(Router);

  activeTab: string = 'Eventos';
  availableRoutes: any[] = [];
  currentItems: TabsListCard[] = [];

  tabs: TabsSection[] = [
    {
      label: 'Eventos',
      content: [
        {
          id: '1',
          img: 'assets/images/jpg/teatro.jpeg',
          title: 'Festival de Teatro de Tatuí',
          description: 'Espetáculos gratuitos e pagos com...',
          category: 'A',
        },
        {
          id: '2',
          img: 'assets/images/png/conservatorio.png',
          title: 'Concerto no Conservatório',
          description: 'Apresentação da orquestra jovem do...',
          category: 'B',
        },
      ],
    },
    {
      label: 'Rotas',
      content: [
        {
          id: '1',
          img: 'assets/images/jpg/teatro.jpeg',
          title: 'Festival de Teatro de Tatuí',
          description: 'Espetáculos gratuitos e pagos com...',
          category: 'A',
        },
        {
          id: '2',
          img: 'assets/images/png/conservatorio.png',
          title: 'Concerto no Conservatório',
          description: 'Apresentação da orquestra jovem do...',
          category: 'B',
        },
      ],
    },
  ];

  ngOnInit(): void {
    this.currentItems = this.tabs[0].content;
    this.loadRoutes();
  }

  loadRoutes() {
    this.availableRoutes = [
      {
        id: '1',
        title: 'Passeio pela Capital da Música',
        priceRange: '$ - $$',
        duration: '4h ~ 4h40m',
        transportIcons: ['accessible', 'rocket', 'directions_bus', 'hotel'],
      },
      {
        id: '2',
        title: 'Adrenalina em Boituva-SP',
        priceRange: '$$-$$$',
        duration: '4h ~ 4h40m',
        transportIcons: ['accessible', 'rocket', 'directions_bus', 'hotel'],
      },
    ];
  }

  onTabChanged(index: number): void {
    this.activeTab = this.tabs[index].label;
    if (this.tabs[index].label !== 'Rotas') {
      this.currentItems = this.tabs[index].content;
    }
  }

  // Este método navega para os DETALHES DO EVENTO (existente)
  onEventClick(event: any) {
    this.router.navigate(['/promotor_turistico/evento', event.id]);
  }

  // NOVO MÉTODO: Navega para os DETALHES DA ROTA (RoutesDatais)
  onRouteClick(route: any) {
    this.router.navigate(['/promotor_turistico/rota', route.id]);
  }

  subscribeToRoute(routeId: string) {
    if (this.routesService.registerUserToRoute(routeId)) {
      console.log('Inscrição realizada com sucesso na rota!');
    } else {
      console.log('Inscrição falhou: você já está inscrito nesta rota.');
    }
  }
}