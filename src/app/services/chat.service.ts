import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ChatMessage } from '../interfaces/chat-message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {}

  getResponse(prompt: string): Observable<ChatMessage> {
    let responseText = '';

    if (prompt.toLowerCase().includes('olá') || prompt.toLowerCase().includes('oi')) {
      responseText = 'Olá! 👋 Como posso te ajudar a planejar seu próximo roteiro?';
    } else if (prompt.toLowerCase().includes('boituva')) {
      responseText =
        'Ah, Boituva! Ótimo lugar para paraquedismo. 🪂 Você gostaria de um roteiro focado em aventura ou algo mais tranquilo?';
    } else if (prompt.toLowerCase().includes('roteiro')) {
      responseText = 'Claro! Para qual cidade você gostaria de um roteiro? E por quantos dias?';
    } else {
      responseText = `Esta é uma resposta mockada para "${prompt}". A IA real fornecerá uma resposta mais detalhada.`;
    }

    const aiMessage: ChatMessage = {
      text: responseText,
      sender: 'ai',
      timestamp: new Date(),
    };

    return of(aiMessage).pipe(delay(1500));
  }
}
