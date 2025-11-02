import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
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
import { c } from '../../../../node_modules/@angular/cdk/a11y-module.d--J1yhM7R';
import { ImageCarouselComponent } from '../../components/image-carousel/image-carousel';
import { CardCarouselComponent } from '../../components/card-carousel/card-carousel';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';

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

  messages: ChatMessage[] = [];
  currentMessage: string = '';
  isLoadingAiResponse: boolean = false;

  suggestions: string[] = [
    'Atividades em Boituva e Região',
    'Roteiros Gastronômicos',
    'Eventos Culturais',
    'Passeios de Balão',
  ];

  constructor(private router: Router, private chatService: ChatService) {}

  ngOnInit(): void {
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
    console.log('Botão "Salvar Roteiro" clicado. Navegar para a próxima etapa.');
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
    this.ngOnInit();
  }
}
