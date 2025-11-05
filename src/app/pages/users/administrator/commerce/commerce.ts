import { Component, inject } from '@angular/core';
import { CommerceService } from '../../../../services/commerce.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Commerce } from '../../../../interfaces/commerce';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';

@Component({
  selector: 'app-administrator-commerce',
  imports: [HeaderTitle, MatIconModule, MatButtonModule, CommonModule, FooterUsercomumComponent],
  templateUrl: './commerce.html',
  styleUrl: './commerce.scss',
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
    this.router.navigate(['/administrador/comercios/detalhe', commerce.id]);
  }

  registerNewCommerce(): void {
    this.router.navigate(['/administrador/comercios/cadastro']);
  }
}
