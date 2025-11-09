export interface Review {
  id: string;
  targetId: string;
  targetType: 'commerce' | 'route' | 'event';
  userId: string;
  userName: string;
  userImageUrl: string;
  rating: number;
  comment: string;
  date: Date;
}