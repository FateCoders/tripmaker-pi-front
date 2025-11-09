// src/app/services/review.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Review } from '../interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private mockReviews: Review[] = [
    {
      id: 'r1', targetId: 'b-1', targetType: 'commerce', userId: 'via-1',
      userName: 'Ana Beatriz', userImageUrl: 'assets/images/png/commom-user.png',
      rating: 5, date: new Date(2025, 10, 8),
      comment: 'Experiência incrível! O Conservatório é lindo e a apresentação foi emocionante. Recomendo a todos!'
    },
    {
      id: 'r2', targetId: 'b-1', targetType: 'commerce', userId: 'via-2',
      userName: 'Carlos Silva', userImageUrl: 'assets/images/png/commom-user.png',
      rating: 4, date: new Date(2025, 10, 5),
      comment: 'Lugar muito bonito e histórico. Só achei a fila um pouco longa para entrar, mas valeu a pena.'
    },
    {
      id: 'r3', targetId: 'b-1', targetType: 'commerce', userId: 'via-3',
      userName: 'Mariana P.', userImageUrl: 'assets/images/png/commom-user.png',
      rating: 3, date: new Date(2025, 10, 1),
      comment: 'A acústica é boa, mas o evento que participei foi um pouco desorganizado.'
    },
    {
      id: 'r4', targetId: 'evento-x-1', targetType: 'event', userId: 'via-4',
      userName: 'Lucas Mendes', userImageUrl: 'assets/images/png/commom-user.png',
      rating: 5, date: new Date(2025, 9, 20),
      comment: 'O Festival de Teatro foi sensacional! Peças de altíssimo nível.'
    }
  ];

  constructor() { }

  getReviewsByTarget(targetId: string, targetType: 'commerce' | 'route' | 'event'): Observable<Review[]> {
    const reviews = this.mockReviews.filter(
      r => r.targetId === targetId && r.targetType === targetType
    );
    return of(reviews).pipe(delay(500));
  }
}