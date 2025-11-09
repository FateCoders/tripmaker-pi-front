// src/app/services/commerce.service.ts

import { Component, Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { Commerce } from '../../../../interfaces/commerce';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { CommonModule } from '@angular/common';
import { CommerceService } from '../../../../services/commerce.service';
import { Router } from '@angular/router';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';

const dateDaysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

@Component({
  selector: 'app-administrator-commerce',
  standalone: true,
  imports: [CommonModule, HeaderTitle, MatButtonModule, MatIconModule, FooterUsercomumComponent],
  templateUrl: './commerce.html',
  styleUrls: ['./commerce.scss'],
})
export class AdministratorCommerce {
  private commerceService = inject(CommerceService);
  private router = inject(Router);

  commerces$!: Observable<Commerce[]>;
  isLoading = true;

  ngOnInit(): void {
    this.commerces$ = this.commerceService.getAllCommercesForUser();
    this.commerces$.subscribe(() => (this.isLoading = false));
  }

  getRatingStars(rating: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, i) => i < rating);
  }

  onCommerceClick(commerce: Commerce): void {
    this.commerceService.selectCommerce(commerce.id);
    this.router.navigate(['/administrador/comercios/detalhe/', commerce.id]);
  }

  registerNewCommerce(): void {
    this.router.navigate(['/administrador/comercios/cadastro']);
  }
}
