export interface ChatMessage {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}