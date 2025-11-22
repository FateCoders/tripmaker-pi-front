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

@Component({
  selector: 'app-tourism-promoter-home',
  standalone: true,
  imports: [
    CommonModule,
    FooterUsercomumComponent,
    HeaderTitle,
    TabsList,
    ListCard, // Para Eventos
    MatIconModule,
    MatCardModule, // Para o Card de Rotas (Antigo)
    MatButtonModule,
    MatMenuModule,
    ChipButtonComponent // Para os chips dentro do Card de Rotas
  ],
  templateUrl: './tourism-promoter-home.html',
  styleUrls: ['./tourism-promoter-home.scss'],
})
export class TourismPromoterHome implements OnInit {
  private router = inject(Router);
  private dialog = inject(MatDialog);

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
    this.eventItems = [
      {
        id: '1',
        title: 'Festival de Teatro',
        description: 'Cultural • 24/02/2025',
        img: 'assets/images/jpg/teatro.jpeg',
        category: 'Eventos'
      },
      {
        id: '2',
        title: 'Concerto Jovem',
        description: 'Música • 25/02/2025',
        img: 'assets/images/png/conservatorio.png',
        category: 'Eventos'
      },
    ];

    // Mock de Rotas com as propriedades do layout antigo
    this.routeItems = [
      {
        id: 'rot-1',
        title: 'Passeio pela Capital da Música',
        priceRange: '$ - $$',
        duration: '4h',
        transportIcons: ['directions_bus', 'accessible', 'restaurant'],
        // Propriedades extras caso precise
        description: 'Um tour completo.' 
      },
      {
        id: 'rot-2',
        title: 'Adrenalina em Boituva-SP',
        priceRange: '$$-$$$',
        duration: '6h',
        transportIcons: ['rocket', 'hotel', 'hiking'],
        description: 'Paraquedismo e Balonismo.'
      },
    ];
  }

  onTabChanged(index: number): void {
    this.activeTab = this.tabs[index].label;
    this.displayItems = this.activeTab === 'Eventos' ? this.eventItems : this.routeItems;
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
        confirmText: 'Excluir'
      },
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.activeTab === 'Eventos') {
          this.eventItems = this.eventItems.filter(i => i.id !== item.id);
          this.displayItems = this.eventItems;
        } else {
          this.routeItems = this.routeItems.filter(i => i.id !== item.id);
          this.displayItems = this.routeItems;
        }
      }
    });
  }

  createNewRoute() {
    this.router.navigate(['/promotor_turistico/mapa']);
  }

  createNewEvent() {
    this.router.navigate(['/promotor_turistico/eventos/novo-evento']);
  }
}