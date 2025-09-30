import { Component } from "@angular/core";
import { HeaderTitle } from "../../../../components/header-title/header-title";
import { ListView } from "../../../../components/list-view/list-view";
import { FooterUsercomumComponent } from "../../../../components/public/bottom-menu/bottom-menu.component";
import { TabsList } from "../../../../components/tabs-list/tabs-list";
import { ListItem } from "../../../../interfaces/list-item";
import { TabsSection } from "../../../../interfaces/tabs-section";


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
      content: [
        {
          type: 'default',
          id: '1',
          image: {
            url: 'https://placehold.co/150',
            alt: 'Image description',
          },
          isFavorite: true,
          title: 'Festival de Teatro de Tatuí',
          priceRange: '$$',
          distance: '• 2 km de distância',
          description: 'Espetáculos gratuitos e pagos com...',
          category: 'A',
        },
        {
          type: 'default',
          id: '2',
          image: {
            url: 'https://placehold.co/150',
            alt: 'Image description',
          },          isFavorite: false,
          title: 'Concerto no Conservatório',
          priceRange: '$',
          distance: '• 3 km de distância',
          description: 'Apresentação da orquestra jovem do...',
          category: 'B',
        },
      ],
    },
    {
      label: 'Eventos',
      content: [
        {
          type: 'event',
          id: '1',
          title: 'Festival de Teatro de Tatuí',
          description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          categories: [
            { label: 'Cultura', icon: 'theater_comedy' }
          ],
          image: {
            url: 'https://placehold.co/150',
            alt: 'Banner Festival de Teatro',
          },
          price: 50,
          date: new Date('2025-10-01'),
          location: {
            id: 'loc-001',
            google_maps_id: 'ChIJ1234abcd5678',
            city: 'Tatuí',
            uf: 'SP',
            country: 'Brasil',
            complement: 'Praça Central',
            coordinates: { lat: -23.355, lng: -47.856 },
          },
          starts_at: new Date('2025-10-01T19:00:00'),
          ends_at: new Date('2025-10-01T22:00:00'),
        },
      ],
    },
    {
      label: 'Rotas',
      content: [],
    },
  ];

  currentItems: ListItem[] = this.tabs[0].content;

  onTabChanged(index: number): void {
    this.currentItems = this.tabs[index].content;
  }
}
