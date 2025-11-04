import { Component, OnInit, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RoutesService } from '../../../../services/routes.service';
import { ListView } from '../../../../components/list-view/list-view';
import { TabsList } from '../../../../components/tabs-list/tabs-list';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { TabsListCard } from '../../../../models/tabs-list-card';
import { TabsSection } from '../../../../models/tabs-section';
import { Chip } from '../../../../components/chip/chip';
import { MatIconModule } from '@angular/material/icon';
import { ListCard } from "../../../../components/card-default/card-default";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-tourism-promoter-home',
  imports: [
    FooterUsercomumComponent,
    ListView,
    HeaderTitle,
    TabsList,
    MatListModule,
    Chip,
    MatIconModule,
    MatCardModule
],
  templateUrl: './tourism-promoter-home.html',
  styleUrl: './tourism-promoter-home.scss',
})
export class TourismPromoterHome {
  private routesService = inject(RoutesService);

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
    this.availableRoutes = this.routesService.getVisibleRoutes();
  }

  onTabChanged(index: number): void {
    this.activeTab = this.tabs[index].label;
    this.currentItems = this.tabs[index].content;
  }

  subscribeToRoute(routeId: string) {
    if (this.routesService.registerUserToRoute(routeId)) {
      console.log('Inscrição realizada com sucesso na rota!');
    } else {
      console.log('Inscrição falhou: você já está inscrito nesta rota.');
    }
  }
}
