// fatecoders/tripmaker-pi-front/tripmaker-pi-front-49-feature-criar-interfaces-para-rotas-eventos-e-roteiros/src/app/pages/users/traveler/traveler-home/traveler-home.ts
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
      content: [
        {
          type: 'route',
          id: '3', // Alterado ID para não colidir
          title: 'Tour Cultural Histórico',
          categories: [
            { label: 'História', icon: 'museum' },
            { label: 'Arte', icon: 'palette' }
          ],
          image: {
            url: 'https://placehold.co/150',
            alt: 'Imagem da Rota Cultural',
          },
          price: 0, // Gratuito
          date: new Date('2025-12-05'),
          location: {
            id: 'loc-005',
            google_maps_id: 'GMI-005',
            city: 'Tatuí',
            uf: 'SP',
            country: 'Brasil',
            complement: 'Início na Praça da Matriz',
            coordinates: { lat: -23.355, lng: -47.856 },
          },
          starts_at: new Date('2025-12-05T09:00:00'),
          ends_at: new Date('2025-12-05T16:00:00'),
          itinerary: [
            { passo: 1, descricao: 'Visita ao Museu' },
            { passo: 2, descricao: 'Almoço no Centro' },
          ],
        },
        {
          type: 'route',
          id: '4', // Alterado ID para não colidir
          title: 'Rota Gastronômica de Tatuí',
          categories: [
            { label: 'Gastronomia', icon: 'restaurant' }
          ],
          image: {
            url: 'https://placehold.co/150',
            alt: 'Imagem da Rota Gastronômica',
          },
          price: 50, // Custo médio de alimentação
          date: new Date('2025-11-20'),
          location: {
            id: 'loc-006',
            google_maps_id: 'GMI-006',
            city: 'Tatuí',
            uf: 'SP',
            country: 'Brasil',
            complement: 'Início na Feira',
            coordinates: { lat: -23.360, lng: -47.850 },
          },
          starts_at: new Date('2025-11-20T11:00:00'),
          ends_at: new Date('2025-11-20T15:00:00'),
          itinerary: [
            { passo: 1, descricao: 'Degustação de doces' },
            { passo: 2, descricao: 'Almoço típico' },
          ],
        },
      ],
    },
  ];

  currentItems: ListItem[] = this.tabs[0].content;

  onTabChanged(index: number): void {
    this.currentItems = this.tabs[index].content;
  }
}