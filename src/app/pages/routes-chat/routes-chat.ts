import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ChatBubbleComponent } from '../../components/chat-bubble/chat-bubble';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../interfaces/chat-message';
import { HeaderTitle } from "../../components/header-title/header-title";

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
    ChatBubbleComponent,
    HeaderTitle
],
  templateUrl: './routes-chat.html',
  styleUrls: ['./routes-chat.scss'],
})
export class RoutesChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatContent') private chatContent: ElementRef | undefined;

  messages: ChatMessage[] = [];
  currentMessage: string = '';
  isLoadingAiResponse: boolean = false;

  constructor(private router: Router, private chatService: ChatService) {}

  ngOnInit(): void {
    this.messages.push({
      text: 'Olá! Sou seu assistente de viagens. 👋\nMe diga para onde você quer ir, quantos dias e quais são seus interesses, e eu criarei um roteiro para você!',
      sender: 'ai',
      timestamp: new Date(),
    });
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
      text: text,
      sender: 'user',
      timestamp: new Date(),
    };
    this.messages.push(userMessage);

    this.currentMessage = '';
    this.isLoadingAiResponse = true;
    this.scrollToBottom();

    this.chatService.getResponse(text).subscribe((aiResponse) => {
      this.messages.push(aiResponse);
      this.isLoadingAiResponse = false;
      this.scrollToBottom();
    });
  }

  goBack(): void {
    this.router.navigate(['/viajante/roteiros']);
  }

  private scrollToBottom(): void {
    try {
      if (this.chatContent) {
        this.chatContent.nativeElement.scrollTop =
          this.chatContent.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Scroll to bottom failed', err);
    }
  }
}