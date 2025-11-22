import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Review } from '../../interfaces/review';

@Component({
  selector: 'app-card-review',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './card-review.html',
  styleUrl: './card-review.scss'
})
export class CardReview {
  @Input({ required: true }) review!: Review;


  get stars(): ('star' | 'star_border' | 'star_half')[] {
    const fullStars = Math.floor(this.review.rating);
    const halfStar = this.review.rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return [
      ...Array(fullStars).fill('star'),
      ...Array(halfStar).fill('star_half'),
      ...Array(emptyStars).fill('star_border')
    ];
  }
}