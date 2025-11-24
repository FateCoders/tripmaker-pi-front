import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Material
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

// Components & Services
import { RoutesService } from '../../../../services/routes.service';
import { ListView } from '../../../../components/list-view/list-view';
import { TabsList } from '../../../../components/tabs-list/tabs-list';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { ChipButtonComponent } from '../../../../components/buttons/chip-button/chip-button';
import { ConfirmDialog } from '../../../../components/confirm-dialog/confirm-dialog';
import { TabsListCard } from '../../../../models/tabs-list-card';
import { TabsSection } from '../../../../models/tabs-section';

@Component({
  selector: 'app-traveler-home',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatCardModule, // Necessário para o novo estilo
    MatIconModule,
    MatMenuModule, // Necessário para o menu de 3 pontos
    ListView,
    TabsList,
    HeaderTitle,
    FooterUsercomumComponent,
    ChipButtonComponent, // Necessário para os chips
  ],
  templateUrl: './traveler-home.html',
  styleUrls: ['./traveler-home.scss'],
})
export class TravelerHome implements OnInit {
  private routesService = inject(RoutesService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  activeTab: string = 'Meus Roteiros';

  // Dados processados para exibição
  availableRoutes: any[] = [];
  currentItems: TabsListCard[] = [];

  tabs: TabsSection[] = [
    { label: 'Meus Roteiros', content: [] },
    { label: 'Eventos', content: [] }, // Conteúdo mockado carregado abaixo
    { label: 'Rotas', content: [] },
  ];

  ngOnInit(): void {
    this.loadMockEvents();
    this.loadRoutes();
    this.onTabChanged(0);
  }

  loadMockEvents() {
    this.tabs[1].content = [
      {
        id: '1',
        img: 'assets/images/jpg/teatro.jpeg',
        title: 'Festival de Teatro de Tatuí',
        description: 'Espetáculos gratuitos e pagos.',
        category: 'A',
      },
      {
        id: '2',
        img: 'assets/images/png/conservatorio.png',
        title: 'Concerto no Conservatório',
        description: 'Apresentação da orquestra jovem.',
        category: 'B',
      },
    ];
  }

  loadRoutes() {
    const rawRoutes = this.routesService.getVisibleRoutes();

    // Mapeia os dados brutos para o formato visual rico do card (mockando dados faltantes)
    this.availableRoutes = rawRoutes.map((route) => ({
      id: route.id,
      title: route.title,
      description: route.description,
      priceRange: '$$ - $$$', // Mock
      duration: '4h', // Mock
      transportIcons: ['directions_bus', 'accessible', 'restaurant'], // Mock
      img: route.img || 'assets/images/png/placeholder.png',
    }));
  }

  onTabChanged(index: number): void {
    this.activeTab = this.tabs[index].label;
    this.currentItems = this.tabs[index].content;

    // Se for a aba Rotas, recarregamos para garantir dados frescos
    if (this.activeTab === 'Rotas') {
      this.loadRoutes();
    }
  }

  // --- Ações de Navegação ---

  onRouteClick(route: any): void {
    // Navega para o componente antigo de detalhes (agora reutilizado)
    this.router.navigate(['/viajante/rotas', route.id]);
  }

  onEventClick(item: any): void {
    this.router.navigate(['/viajante/eventos', item.id]);
  }

  // --- Ações de Menu (Editar/Excluir) ---

  onEdit(event: Event, route: any): void {
    event.stopPropagation();
    console.log('Editar rota (Traveler):', route.title);
    // Aqui você implementaria a navegação para edição ou abriria o chat com contexto de edição
  }

  onDelete(event: Event, route: any): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Remover Rota',
        message: `Deseja remover "${route.title}" da sua lista?`,
        confirmText: 'Remover',
      },
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Simula remoção local
        this.availableRoutes = this.availableRoutes.filter((r) => r.id !== route.id);
        console.log('Rota removida:', route.id);
      }
    });
  }
}
