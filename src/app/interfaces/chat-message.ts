import { RouteCardItem } from './route-card-item';

export type ChatMessageType = 'text' | 'image-carousel' | 'card-carousel' | 'loading';

export interface ChatMessage {
  sender: 'user' | 'ai';
  type: ChatMessageType;
  timestamp: Date;
  
  text?: string;
  images?: string[];
  items?: RouteCardItem[];
}