import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../interfaces/chat-message';
import { HeaderTitle } from '../../components/header-title/header-title';
import { ChatBubbleComponent } from '../../components/chat-bubble/chat-bubble';
import { ImageCarouselComponent } from '../../components/image-carousel/image-carousel';
import { CardCarouselComponent } from '../../components/card-carousel/card-carousel';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { RoutesService } from '../../services/routes.service'; // << Importado

@Component({
  selector: 'app-routes-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HeaderTitle,
    ChatBubbleComponent,
    ImageCarouselComponent,
    CardCarouselComponent,
    MatChipListbox,
    MatChipOption,
  ],
  templateUrl: './routes-chat.html',
  styleUrls: ['./routes-chat.scss'],
})
export class RoutesChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatContent') private chatContent: ElementRef | undefined;

  // Injeções
  private router = inject(Router);
  private chatService = inject(ChatService);
  private routesService = inject(RoutesService); // << Injetado

  messages: ChatMessage[] = [];
  currentMessage: string = '';
  isLoadingAiResponse: boolean = false;

  suggestions: string[] = [
    'Atividades em Boituva e Região',
    'Roteiros Gastronômicos',
    'Eventos Culturais',
    'Passeios de Balão',
  ];

  // Adicionando um array para armazenar os itens selecionados (que virão do card-carousel)
  currentRouteItems: any[] = []; 
  
  ngOnInit(): void {
    // Tenta carregar o roteiro salvo do localStorage (se o usuário voltar)
    const loadedItems = this.routesService.loadCurrentRoute();
    if (loadedItems.length > 0) {
      this.currentRouteItems = loadedItems;
      this.messages.push({
        type: 'text',
        sender: 'ai',
        text: `Olá! Seu roteiro tem ${loadedItems.length} pontos. O que você gostaria de adicionar ou mudar?`,
        timestamp: new Date(),
      });
    } else {
      this.messages = [
        {
          type: 'image-carousel',
          sender: 'ai',
          timestamp: new Date(),
          images: [
            'assets/images/jpg/teatro.jpeg',
            'assets/images/jpg/exposicao-arte.jpg',
            'assets/images/png/conservatorio.png',
            'assets/images/webp/feira-gastronomica.webp',
          ],
        },
        {
          type: 'text',
          sender: 'ai',
          text: 'Olá! 👋 Comece se inspirando nas imagens acima ou me diga o que você busca.\n\nEx: "Atividades em Boituva e Região"',
          timestamp: new Date(new Date().getTime() + 100),
        },
      ];
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  sendMessage(): void {
    const text = this.currentMessage.trim();
    if (text === '' || this.isLoadingAiResponse) {
      return;
    }

    const userMessage: ChatMessage = {
      type: 'text',
      sender: 'user',
      text: text,
      timestamp: new Date(),
    };
    this.messages.push(userMessage);

    this.currentMessage = '';
    this.isLoadingAiResponse = true;
    this.addLoadingMessage();
    this.scrollToBottom();

    this.chatService.getResponse(text).subscribe((aiResponse) => {
      this.removeLoadingMessage();
      
      // Se a resposta for um carousel de cards, adiciona os itens ao roteiro atual
      if (aiResponse.type === 'card-carousel' && aiResponse.items) {
          // MOCK: Para simulação, vamos adicionar todos os itens do carousel de uma vez
          // A lógica real adicionaria item por item quando o usuário clicasse em "Adicionar"
          this.currentRouteItems.push(...aiResponse.items);
          console.log(`Itens adicionados ao roteiro: ${aiResponse.items.length}`);
          
          // Adiciona uma mensagem de confirmação
          const confirmationMessage: ChatMessage = {
            type: 'text',
            sender: 'ai',
            text: `Encontrei ${aiResponse.items.length} locais. Você pode adicioná-los no carrossel ou pedir mais sugestões.`,
            timestamp: new Date(),
          };
          this.messages.push(confirmationMessage);
      }
      
      this.messages.push(aiResponse);
      this.isLoadingAiResponse = false;
      this.scrollToBottom();
    });
  }

  sendSuggestion(suggestion: string): void {
    if (this.isLoadingAiResponse) return;
    this.currentMessage = suggestion;
    this.sendMessage();
  }

  saveRoute(): void {
    if (this.currentRouteItems.length === 0) {
      // Exibe um erro ou modal (usando console.log como alternativa para alert)
      console.warn('Não é possível avançar: O roteiro está vazio.');
      return;
    }

    // Ação: 1. Salvar o roteiro atual no localStorage (para a próxima tela ler)
    this.routesService.saveCurrentRoute(this.currentRouteItems);
    
    // Ação: 2. Navegar para a próxima etapa (resumo)
    this.router.navigate(['/viajante/roteiros/resumo']);
  }

  private addLoadingMessage(): void {
    const loadingMessage: ChatMessage = {
      type: 'loading',
      sender: 'ai',
      timestamp: new Date(),
    };
    this.messages.push(loadingMessage);
  }

  private removeLoadingMessage(): void {
    const loadingIndex = this.messages.findIndex((m) => m.type === 'loading');
    if (loadingIndex > -1) {
      this.messages.splice(loadingIndex, 1);
    }
  }

  goBack(): void {
    this.router.navigate(['/viajante/roteiros']);
  }

  private scrollToBottom(): void {
    try {
      if (this.chatContent) {
        this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Scroll to bottom failed', err);
    }
  }

  reset(): void {
    this.routesService.clearCurrentRoute(); // Limpa o roteiro no storage
    this.currentRouteItems = []; // Limpa o estado local
    this.messages = [];
    this.ngOnInit(); // Reinicia o componente
  }
}
