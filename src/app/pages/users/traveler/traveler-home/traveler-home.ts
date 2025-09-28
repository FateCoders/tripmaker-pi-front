import { Component } from '@angular/core';
import { FooterUsercomumComponent } from "../../../../components/public/bottom-menu/bottom-menu.component";
import { HeaderTitle } from "../../../../components/header-title/header-title";
import { ListView } from "../../../../components/list-view/list-view";
import { TabsList } from "../../../../components/tabs-list/tabs-list";

export interface ListItem {
  id: string;
  img: string; // Adicionei um campo para o ícone do coração
  isFavorite: boolean;
  title: string;
  priceRange: string; // Ex: '$$', '$$$'
  distance: string; // Ex: '• 2 km de distância'
  description: string;
  category: 'A' | 'B' | 'C'; // Você pode adaptar as categorias se quiser
}

export interface TabsSection {
  label: string;
  content: ListItem[];
}

@Component({
  selector: 'app-traveler-home',
  imports: [FooterUsercomumComponent, HeaderTitle, ListView, TabsList],
  templateUrl: './traveler-home.html',
  styleUrl: './traveler-home.scss'
})
export class TravelerHome {
  tabs: TabsSection[] = [
    {
      label: 'Meus Roteiros',
      content: [], // Vazio para corresponder ao "Nenhum roteiro encontrado"
    },
    {
      label: 'Eventos',
      content: [
        {
          id: '1',
          img: 'assets/images/jpg/teatro.jpeg', // Sugestão: coloque as imagens em /assets
          isFavorite: true,
          title: 'Festival de Teatro de Tatuí',
          priceRange: '$$',
          distance: '• 2 km de distância',
          description: 'Espetáculos gratuitos e pagos com...',
          category: 'A',
        },
        {
          id: '2',
          img: 'assets/images/png/conservatorio.png',
          isFavorite: false,
          title: 'Concerto no Conservatório',
          priceRange: '$',
          distance: '• 3 km de distância',
          description: 'Apresentação da orquestra jovem do...',
          category: 'B',
        },
        {
          id: '3',
          img: 'assets/images/webp/feira-gastronomica.webp',
          isFavorite: true,
          title: 'Feira Gastronômica de Tatuí',
          priceRange: '$$$',
          distance: '• 4 km de distância',
          description: 'Comidas típicas, food trucks,...',
          category: 'A',
        },
        {
          id: '4',
          img: 'assets/images/jpg/exposicao-arte.jpg',
          isFavorite: false,
          title: 'Exposição de Arte Moderna',
          priceRange: 'Gratuito',
          distance: '• 1.5 km de distância',
          description: 'Obras de artistas locais e regionais.',
          category: 'C',
        },
      ],
    },
    {
      label: 'Rotas',
      content: [], // Vazio para corresponder ao "Nenhuma rota encontrada"
    },
  ];

  currentItems: ListItem[] = this.tabs[0].content;

  onTabChanged(index: number): void {
    this.currentItems = this.tabs[index].content;
  }
}
