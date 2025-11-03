import { Component, inject } from '@angular/core';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { RoutesService } from '../../../../services/routes.service';
import { TabsListCard } from '../../../../models/tabs-list-card';
import { TabsSection } from '../../../../models/tabs-section';
import { TabsList } from '../../../../components/tabs-list/tabs-list';
import { ListView } from '../../../../components/list-view/list-view';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-administrator-events',
  imports: [
    HeaderTitle,
    FooterUsercomumComponent,
    MatListModule,
    MatButtonModule,
    ListView,
    TabsList,
  ],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class AdministratorEvents {
  private routesService = inject(RoutesService);

  activeTab: string = 'Meus Roteiros';
  availableRoutes: any[] = [];
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
    this.currentItems = this.tabs[0].content;
    this.loadRoutes();
  }

  loadRoutes() {
    this.availableRoutes = this.routesService.getVisibleRoutes();
  }

  onTabChanged(index: number): void {
    this.activeTab = this.tabs[index].label;
    this.currentItems = this.tabs[index].content;
  }
}
