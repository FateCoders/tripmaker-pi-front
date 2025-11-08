// src/app/pages/users/administrator/events/events.ts

import { Component, inject, OnInit } from '@angular/core';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { RoutesService } from '../../../../services/routes.service';
import { TabsListCard } from '../../../../models/tabs-list-card';
import { TabsSection } from '../../../../models/tabs-section';
import { TabsList } from '../../../../components/tabs-list/tabs-list';
import { ListView } from '../../../../components/list-view/list-view';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Route } from '../../../../interfaces/routes';

@Component({
  selector: 'app-administrator-events',
  standalone: true,
  imports: [
    CommonModule,
    HeaderTitle,
    FooterUsercomumComponent,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ListView,
    TabsList,
  ],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class AdministratorEvents implements OnInit {
  private routesService = inject(RoutesService);
  private router = inject(Router);

  activeTab: string = 'Rotas';

  currentItems: TabsListCard[] = [];

  tabs: TabsSection[] = [
    {
      label: 'Rotas',
      content: [],
    },
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
  ];

  ngOnInit(): void {
    this.loadRoutes();

    this.activeTab = this.tabs[0].label;
    this.currentItems = this.tabs[0].content;
  }

  loadRoutes() {
    const routesFromService = this.routesService.getVisibleRoutes();

    // CORREÇÃO: Adicionado o tipo 'Route' ao parâmetro
    const mappedRoutes: TabsListCard[] = routesFromService.map((route: Route) => {
      return {
        id: route.id,
        title: route.title,
        description: route.description,
        img: route.img || 'assets/images/png/placeholder.png',
        category: 'Rota',
      };
    });

    this.tabs[0].content = mappedRoutes;

    if (this.activeTab === 'Rotas') {
      this.currentItems = this.tabs[0].content;
    }
  }

  onTabChanged(index: number): void {
    this.activeTab = this.tabs[index].label;
    this.currentItems = this.tabs[index].content;
  }

  createNewRoute(): void {
    console.log('Navegando para criação de Nova Rota...');
    this.router.navigate(['/administrador/eventos/nova-rota']);
  }

  createNewEvent(): void {
    console.log('Navegando para criação de Novo Evento...');
    this.router.navigate(['/administrador/eventos/novo-evento']);
  }
}