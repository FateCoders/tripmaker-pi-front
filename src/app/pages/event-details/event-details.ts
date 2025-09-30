import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FooterUsercomumComponent } from '../../components/public/bottom-menu/bottom-menu.component';

export interface EventDetails {
  id: string;
  headerImageURL: string;
  title: string;
  location: string;
  address: string;
  date: string;
  time: string;
  description: string;
  programDetails: string;
  galleryImages: string[];
  userHasPresenceMarked?: boolean;
  showGenerateCodeButton?: boolean;
}

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, FooterUsercomumComponent],
  templateUrl: './event-details.html',
  styleUrls: ['./event-details.scss'],
})
export class EventDetailsComponent implements OnInit {
  event: EventDetails | undefined;
  isLoading = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.loadEventDetails(eventId);
    }
  }

  loadEventDetails(id: string): void {

    setTimeout(() => {
      this.event = {
        id: id,
        headerImageURL:
          'https://images.unsplash.com/photo-1514525253164-ff4ade296a0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Encontro de Música Popular Brasileira',
        location: 'Tatuí - SP',
        address: 'Endereço do Conservatório, 123',
        date: '24 de Fevereiro, 2025',
        time: '11h30 - 18h30',
        description:
          'Venha prestigiar apresentações de artistas locais e estudantes do Conservatório de Tatuí em uma tarde de celebração à música popular brasileira. O evento contará com shows ao vivo, feira de artesanato, comidas típicas e oficinas culturais gratuitas.',
        programDetails:
          'A programação inclui apresentações especiais de Luiz Freitas e Banda Trem Caipira, além de roda de conversa sobre o impacto da música na cultura regional.',
        galleryImages: [
          'https://images.unsplash.com/photo-1506198656606-d760f331904a?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1506198656606-d760f331904a?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        ],
        userHasPresenceMarked: true,
        showGenerateCodeButton: false,
      };
      this.isLoading = false;
    }, 500);
  }

  markPresence(): void {
    console.log('Presença marcada para o evento:', this.event?.id);
    if (this.event) {
      this.event.userHasPresenceMarked = true;
      this.event.showGenerateCodeButton = true; // Altera para mostrar o botão de código
    }
  }

  generateEntryCode(): void {
    console.log('Gerar código de entrada para o evento:', this.event?.id);
    // Lógica para gerar e exibir o código
  }
}
