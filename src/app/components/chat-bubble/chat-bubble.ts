import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ChatMessage } from '../../interfaces/chat-message';

@Component({
  selector: 'app-chat-bubble',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './chat-bubble.html',
  styleUrls: ['./chat-bubble.scss'],
})
export class ChatBubbleComponent {
  @Input({ required: true }) message!: ChatMessage;
}