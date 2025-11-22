import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

import { TabsList } from '../../../../components/tabs-list/tabs-list';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { ListCard } from '../../../../components/card-default/card-default';
import { ConfirmDialog } from '../../../../components/confirm-dialog/confirm-dialog';
import { TabsSection } from '../../../../models/tabs-section';
import { ChipButtonComponent } from '../../../../components/buttons/chip-button/chip-button';
import { RoutesService } from '../../../../services/routes.service'; // Importar o Service

@Component({
  selector: 'app-tourism-promoter-home',
  standalone: true,
  imports: [
    CommonModule,
    FooterUsercomumComponent,
    HeaderTitle,
    TabsList,
    ListCard,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    ChipButtonComponent,
  ],
  templateUrl: './tourism-promoter-home.html',
  styleUrls: ['./tourism-promoter-home.scss'],
})
export class TourismPromoterHome implements OnInit {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private routesService = inject(RoutesService); // Injetar o Service

  activeTab: string = 'Eventos';

  eventItems: any[] = [];
  routeItems: any[] = [];
  displayItems: any[] = [];

  tabs: TabsSection[] = [
    { label: 'Eventos', content: [] },
    { label: 'Rotas', content: [] },
  ];

  ngOnInit(): void {
    this.loadData();
    this.onTabChanged(0);
  }

  loadData() {
    // 1. Carregar Eventos (Mantendo Mock local por enquanto, ou poderia vir de um EventsService)
    this.eventItems = [
      {
        id: '1',
        title: 'Festival de Teatro',
        description: 'Cultural • 24/02/2025',
        img: 'assets/images/jpg/teatro.jpeg',
        category: 'Eventos',
      },
      {
        id: '2',
        title: 'Concerto Jovem',
        description: 'Música • 25/02/2025',
        img: 'assets/images/png/conservatorio.png',
        category: 'Eventos',
      },
    ];

    // 2. Carregar Rotas do Service (Integração Realizada)
    // Pegamos todas as rotas globais como exemplo. Em um app real, filtraria pelo ID do criador.
    const allRoutes = this.routesService.getAllRoutes();

    this.routeItems = allRoutes.map((route) => ({
      id: route.id,
      title: route.title,
      description: route.description, // Usado como subtítulo
      priceRange: '$$ - $$$', // Mockado pois a interface Route ainda não tem preço
      duration: '4h', // Mockado
      transportIcons: ['directions_bus', 'accessible'], // Mockado
      img: route.img || 'assets/images/png/placeholder.png',
      category: 'Rotas',
    }));
  }

  onTabChanged(index: number): void {
    this.activeTab = this.tabs[index].label;
    // Recarrega os dados sempre que troca de aba para garantir frescor (opcional)
    if (this.activeTab === 'Rotas') {
      this.loadData(); // Atualiza a lista caso tenha sido criada uma nova rota recentemente
      this.displayItems = this.routeItems;
    } else {
      this.displayItems = this.eventItems;
    }
  }

  // Navegação
  onCardClick(item: any) {
    if (this.activeTab === 'Rotas') {
      this.router.navigate(['/promotor_turistico/rota', item.id]);
    } else {
      this.router.navigate(['/promotor_turistico/evento', item.id]);
    }
  }

  // Ações do Menu
  onEdit(item: any) {
    console.log('Editar:', item.title);
  }

  onDelete(item: any) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Excluir Item',
        message: `Deseja excluir "${item.title}"?`,
        confirmText: 'Excluir',
      },
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.activeTab === 'Eventos') {
          this.eventItems = this.eventItems.filter((i) => i.id !== item.id);
          this.displayItems = this.eventItems;
        } else {
          // Aqui idealmente chamaria routesService.deleteRoute(item.id)
          this.routeItems = this.routeItems.filter((i) => i.id !== item.id);
          this.displayItems = this.routeItems;
        }
      }
    });
  }

  createNewRoute() {
    // Rota atualizada para o novo fluxo de chat
    this.router.navigate(['/promotor_turistico/rotas/nova-rota']);
  }

  createNewEvent() {
    this.router.navigate(['/promotor_turistico/eventos/novo-evento']);
  }
}
