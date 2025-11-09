import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, combineLatest, map, startWith, tap } from 'rxjs';

import { Review } from '../../interfaces/review';
import { ReviewService } from '../../services/review.service';
import { CardReview } from '../../components/card-review/card-review';
import { HeaderTitle } from '../../components/header-title/header-title';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatChipsModule,
    HeaderTitle,
    CardReview,
  ],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss'
})
export class Reviews implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private reviewService = inject(ReviewService);

  private allReviews$!: Observable<Review[]>;
  filteredReviews$!: Observable<Review[]>;

  isLoading = signal(true);
  pageTitle = signal('Avaliações');

  filterControl = new FormControl<number | null>(null);
  filterOptions = [
    { label: '5 estrelas', value: 5 },
    { label: '4 estrelas', value: 4 },
    { label: '3 estrelas', value: 3 },
    { label: '2 estrelas', value: 2 },
    { label: '1 estrela', value: 1 },
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const type = this.route.snapshot.paramMap.get('type') as 'commerce' | 'route' | 'event' | null;

    const targetType = type ?? 'commerce';

    if (!id) {
      console.error('ID do alvo não fornecido para avaliações');
      this.goBack();
      return;
    }

    if (targetType === 'commerce') this.pageTitle.set('Avaliações do Comércio');
    if (targetType === 'event') this.pageTitle.set('Avaliações do Evento');
    if (targetType === 'route') this.pageTitle.set('Avaliações da Rota');

    this.allReviews$ = this.reviewService.getReviewsByTarget(id, targetType).pipe(
      tap(() => {
        this.isLoading.set(false);
      })
    );

    const filterChanges$ = this.filterControl.valueChanges.pipe(
      startWith(null)
    );

    this.filteredReviews$ = combineLatest([
      this.allReviews$,
      filterChanges$
    ]).pipe(
      map(([reviews, selectedRating]) => {
        if (selectedRating === null) {
          return reviews;
        }
        return reviews.filter(r => Math.floor(r.rating) === selectedRating);
      })
    );
  }

  toggleFilter(rating: number): void {
    if (this.filterControl.value === rating) {
      this.filterControl.setValue(null);
    } else {
      this.filterControl.setValue(rating);
    }
  }

  goBack(): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {

      this.router.navigate(['/']);
    }
  }
}