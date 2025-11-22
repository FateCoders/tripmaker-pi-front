import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Services & Interfaces
import { ChatService } from '../../../../services/chat.service';
import { ChatMessage } from '../../../../interfaces/chat-message';
import { RoutesService } from '../../../../services/routes.service';
import { RouteCardItem } from '../../../../interfaces/route-card-item';

// Components
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { ChatBubbleComponent } from '../../../../components/chat-bubble/chat-bubble';
import { ImageCarouselComponent } from '../../../../components/image-carousel/image-carousel';
import { CardCarouselComponent } from '../../../../components/card-carousel/card-carousel';

type Step = 'chat' | 'details';

@Component({
  selector: 'app-promoter-new-route',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSlideToggleModule,
    HeaderTitle,
    ChatBubbleComponent,
    ImageCarouselComponent,
    CardCarouselComponent,
  ],
  templateUrl: './promoter-new-route.html',
  styleUrls: ['./promoter-new-route.scss'],
})
export class PromoterNewRoute implements OnInit, AfterViewChecked {
  @ViewChild('chatContent') private chatContent: ElementRef | undefined;

  private router = inject(Router);
  private chatService = inject(ChatService);
  private routesService = inject(RoutesService);
  private fb = inject(FormBuilder);

  // Controle de Fluxo
  currentStep = signal<Step>('chat'); // 'chat' ou 'details'

  // Dados do Chat
  messages: ChatMessage[] = [];
  currentMessage: string = '';
  isLoadingAiResponse: boolean = false;
  suggestions: string[] = [
    'Criar rota histórica em Tatuí',
    'Roteiro gastronômico no centro',
    'Rota de eventos culturais',
  ];

  // Dados da Rota
  currentRouteItems: RouteCardItem[] = []; // Itens acumulados
  detailsForm!: FormGroup; // Formulário final

  ngOnInit(): void {
    this.initChat();
    this.initForm();
  }

  ngAfterViewChecked(): void {
    if (this.currentStep() === 'chat') {
      this.scrollToBottom();
    }
  }

  private initChat(): void {
    this.messages = [
      {
        type: 'text',
        sender: 'ai',
        text: 'Olá, Promotor! 🚀\nEstou aqui para ajudar você a criar uma nova Rota Turística. Me diga o tema ou a cidade, e eu sugiro os pontos!',
        timestamp: new Date(),
      },
    ];
  }

  private initForm(): void {
    this.detailsForm = this.fb.group({
      title: ['', Validators.required],
      isPrivate: [false],
      description: ['']
    });
  }

  // --- LÓGICA DO CHAT ---

  sendMessage(): void {
    const text = this.currentMessage.trim();
    if (text === '' || this.isLoadingAiResponse) return;

    this.messages.push({ type: 'text', sender: 'user', text: text, timestamp: new Date() });
    this.currentMessage = '';
    this.isLoadingAiResponse = true;
    this.messages.push({ type: 'loading', sender: 'ai', timestamp: new Date() });
    
    this.scrollToBottom();

    this.chatService.getResponse(text).subscribe((aiResponse) => {
      this.removeLoadingMessage();

      if (aiResponse.type === 'card-carousel' && aiResponse.items) {
        this.currentRouteItems.push(...aiResponse.items);
        
        // Atualiza o formulário com um título sugerido se estiver vazio
        if (!this.detailsForm.get('title')?.value) {
          this.detailsForm.patchValue({ title: `Rota: ${text}` });
        }

        this.messages.push({
          type: 'text',
          sender: 'ai',
          text: `Encontrei ${aiResponse.items.length} locais. Adicionei à sua lista temporária.`,
          timestamp: new Date(),
        });
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

  private removeLoadingMessage(): void {
    const idx = this.messages.findIndex((m) => m.type === 'loading');
    if (idx > -1) this.messages.splice(idx, 1);
  }

  private scrollToBottom(): void {
    try {
      if (this.chatContent) {
        this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }

  // --- NAVEGAÇÃO ENTRE PASSOS ---

  goToDetails(): void {
    if (this.currentRouteItems.length === 0) {
      // Aqui poderia usar um Toast/Snackbar
      console.warn('Adicione itens à rota antes de prosseguir.');
      return;
    }
    this.currentStep.set('details');
  }

  backToChat(): void {
    this.currentStep.set('chat');
    // Pequeno delay para garantir que o scroll funcione ao voltar
    setTimeout(() => this.scrollToBottom(), 100);
  }

  goBackMain(): void {
    if (this.currentStep() === 'details') {
      this.backToChat();
    } else {
      this.router.navigate(['/promotor_turistico/inicio']);
    }
  }

  resetChat(): void {
    this.currentRouteItems = [];
    this.detailsForm.reset();
    this.initChat();
    this.currentStep.set('chat');
  }

  // --- FINALIZAÇÃO ---

  finishRoute(): void {
    if (this.detailsForm.invalid) {
      this.detailsForm.markAllAsTouched();
      return;
    }

    const routeData = this.detailsForm.value;
    
    // 1. Cria a rota no serviço (adicionando à lista global)
    this.routesService.createPromoterRoute(routeData, this.currentRouteItems);
    
    // 2. Navega de volta para a Home do Promotor
    this.router.navigate(['/promotor_turistico/inicio']);
  }
}