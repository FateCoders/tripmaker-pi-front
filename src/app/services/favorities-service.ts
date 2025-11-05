import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MapItem } from '../components/map-item-card/map-item-card';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  // Dados mockados baseados na imagem 'usuario comum - favoritos.jpg'
  private mockFavorites: { [key: string]: MapItem[] } = {
    Roteiros: [
        // Roteiros (Mock)
        {
            id: 'roteiro-f-1',
            image: 'assets/images/jpg/fundo-landing.jpg', // Usando mock image
            title: 'Roteiro Histórico - Tatuí',
            category: 'Cultural',
            rating: 4.5,
            distance: '4 Locais',
            details: 'Roteiro completo pelo centro histórico e conservatório.'
        },
        {
            id: 'roteiro-f-2',
            image: 'assets/images/jpg/exposicao-arte.jpg', // Usando mock image
            title: 'Roteiro de Aventura - Boituva',
            category: 'Aventura',
            rating: 4.9,
            distance: '3 Locais',
            details: 'Inclui balão e paraquedismo (se for corajoso!).'
        },
    ],
    Rotas: [
        // Rotas (Mock)
        {
            id: 'rota-f-1',
            image: 'assets/images/png/conservatorio.png',
            title: 'Rota Gastronômica',
            category: 'Gastronomia',
            rating: 4.3,
            distance: '1.5 km',
            details: 'Melhores restaurantes da região.',
        },
        {
            id: 'rota-f-2',
            image: 'assets/images/jpg/teatro.jpeg',
            title: 'Rota Cultural',
            category: 'Cultural',
            rating: 4.7,
            distance: '3.0 km',
            details: 'Inclui museus e teatros locais.',
        },
    ],
    Eventos: [
        {
            id: 'evento-f-1',
            image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Festa da Música',
            category: 'Tatuí/SP',
            rating: 5,
            distance: 'Atualizado hoje',
            details: 'Evento de música ao vivo no centro da cidade.',
        },
        {
            id: 'evento-f-2',
            image: 'https://images.pexels.com/photos/1036858/pexels-photo-1036858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Encontro de Food Truck',
            category: 'Cerquilho/SP',
            rating: 4,
            distance: 'Atualizado ontem',
            details: 'Variedade de gastronomia de rua.',
        },
        {
            id: 'evento-f-3',
            image: 'https://images.pexels.com/photos/1572421/pexels-photo-1572421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Festival de Balonismo',
            category: 'Boituva/SP',
            rating: 4.8,
            distance: 'há 2 dias',
            details: 'Voos de balão e shows noturnos.',
        },
        {
            id: 'evento-f-4',
            image: 'https://images.pexels.com/photos/13444004/pexels-photo-13444004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Feira de Artesanato Regional',
            category: 'Tietê/SP',
            rating: 4.2,
            distance: 'Atualizado hoje',
            details: 'Produtos artesanais e culinária típica.',
        },
        {
            id: 'evento-f-5',
            image: 'https://images.pexels.com/photos/33870387/pexels-photo-33870387.jpeg',
            title: 'Mostra de Teatro Amador',
            category: 'Tatuí/SP',
            rating: 4.6,
            distance: 'Atualizado ontem',
            details: 'Apresentações de grupos de teatro locais.',
        },
        {
            id: 'evento-f-6',
            image: 'https://images.pexels.com/photos/7036612/pexels-photo-7036612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Corrida Noturna',
            category: 'Cerquilho/SP',
            rating: 4.9,
            distance: 'Atualizado hoje',
            details: 'Corrida de 5k e 10k com premiação.',
        },
    ],
  };

  constructor() { }

  getFavoritesByTab(tabName: 'Roteiros' | 'Rotas' | 'Eventos'): Observable<MapItem[]> {
    return of(this.mockFavorites[tabName] || []);
  }
  
  toggleFavorite(item: MapItem, type: 'Roteiros' | 'Rotas' | 'Eventos'): Observable<boolean> {
      console.log(`[MOCK] Alternando favorito: ${item.title} em ${type}`);
      return of(true); 
  }
}