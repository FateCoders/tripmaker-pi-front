import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ChatMessage } from '../interfaces/chat-message';
import { RouteCardItem } from '../interfaces/route-card-item';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {}

  getResponse(prompt: string): Observable<ChatMessage> {
    let response: ChatMessage;

    if (prompt.toLowerCase().includes('imagem') || prompt.toLowerCase().includes('foto')) {
      response = {
        type: 'image-carousel',
        sender: 'ai',
        timestamp: new Date(),
        images: [
          'assets/images/jpg/teatro.jpeg',
          'assets/images/jpg/exposicao-arte.jpg',
          'assets/images/png/conservatorio.png',
          'assets/images/webp/feira-gastronomica.webp',
        ],
      };
    } else if (prompt.toLowerCase().includes('boituva')) {
      response = {
        type: 'card-carousel',
        sender: 'ai',
        timestamp: new Date(),
        items: this.getBoituvaMockItems(),
      };
    } else if (prompt.toLowerCase().includes('olá')) {
      response = {
        type: 'text',
        sender: 'ai',
        text: 'Olá! 👋 Como posso te ajudar a planejar seu próximo roteiro? Você pode pedir por "eventos em Boituva" ou "imagens de Tatuí".',
        timestamp: new Date(),
      };
    } else {
      response = {
        type: 'text',
        sender: 'ai',
        text: `Esta é uma resposta mockada para "${prompt}". A IA real fornecerá uma resposta mais detalhada.`,
        timestamp: new Date(),
      };
    }

    return of(response).pipe(delay(1500));
  }

  private getBoituvaMockItems(): RouteCardItem[] {
    return [
      {
        id: 'evento-x-1',
        image: 'assets/images/jpg/teatro.jpeg', // Imagem da Cachoeira
        title: 'Cachoeira do Barro Preto',
        category: 'Cidade-UF ($$-$$$)', // Subtítulo 1
        rating: 4.5,
        distance: 'Boituva',
        details: 'Trilha leve com acesso a cachoeira de águas claras...', // Subtítulo 2
        duration: '01:00', // Campo de Duração
        icons: ['store', 'stairs', 'accessible', 'hotel', 'directions_bus'], // Ícones
      },
      {
        id: 'evento-x-2',
        image: 'assets/images/jpg/fundo-landing.jpg', // Imagem do Balão
        title: 'Voo de Balão',
        category: 'Cidade-UF ($$-$$$)',
        rating: 4.8,
        distance: 'Boituva',
        details: 'Experiência inesquecível sobrevoando paisagens...',
        duration: '15:00', // Horário (conforme protótipo)
        icons: ['store', 'stairs', 'accessible', 'hotel', 'directions_bus'],
      },
      {
        id: 'evento-y-1',
        image: 'assets/images/jpg/exposicao-arte.jpg',
        title: 'Exposição de Arte',
        category: 'Cidade-UF ($$-$$$)',
        rating: 4.2,
        distance: 'Boituva',
        details: 'Artistas locais exibindo seus trabalhos.',
        duration: '02:30',
        icons: ['store', 'stairs', 'accessible', 'hotel', 'directions_bus'],
      },
    ];
  }
}