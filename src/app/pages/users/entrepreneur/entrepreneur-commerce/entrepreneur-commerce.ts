import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable, of } from 'rxjs';

import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { CommerceService } from '../../../../services/commerce.service';
import { Commerce } from '../../../../interfaces/commerce';
import { AuthService } from '../../../../services/auth.service'; // Importar AuthService

@Component({
  selector: 'app-entrepreneur-commerce',
  standalone: true,
  imports: [
    CommonModule,
    FooterUsercomumComponent,
    HeaderTitle,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './entrepreneur-commerce.html',
  styleUrl: './entrepreneur-commerce.scss'
})
export class EntrepreneurCommerce implements OnInit {
  private commerceService = inject(CommerceService);
  private authService = inject(AuthService); // Injetar
  private router = inject(Router);

  commerces$!: Observable<Commerce[]>;
  isLoading = true;

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();

    if (user && user.id) {
      // Busca APENAS os comércios do usuário logado
      this.commerces$ = this.commerceService.getCommercesByOwnerId(user.id);
      this.commerces$.subscribe(() => this.isLoading = false);
    } else {
      console.error('Usuário não logado ou sem ID');
      this.isLoading = false;
      this.commerces$ = of([]);
    }
  }

  getRatingStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }

  onCommerceClick(commerce: Commerce): void {
    this.commerceService.selectCommerce(commerce.id);
    this.router.navigate(['/empreendedor/inicio']);
  }

  registerNewCommerce(): void {
    this.router.navigate(['/empreendedor/comercios/cadastro']);
  }
}