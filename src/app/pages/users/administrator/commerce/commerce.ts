import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Commerce } from '../../../../interfaces/commerce';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { CommonModule } from '@angular/common';
import { CommerceService } from '../../../../services/commerce.service';
import { Router } from '@angular/router';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';

@Component({
  selector: 'app-administrator-commerce',
  standalone: true,
  imports: [CommonModule, HeaderTitle, MatButtonModule, MatIconModule, FooterUsercomumComponent],
  templateUrl: './commerce.html',
  styleUrls: ['./commerce.scss'],
})
export class AdministratorCommerce implements OnInit {
  private commerceService = inject(CommerceService);
  private router = inject(Router);

  commerces$!: Observable<Commerce[]>;
  isLoading = true;

  ngOnInit(): void {
    this.commerces$ = this.commerceService.getAllCommerces();
    this.commerces$.subscribe(() => (this.isLoading = false));
  }

  getRatingStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }

  onCommerceClick(commerce: Commerce): void {
    this.router.navigate(['/administrador/comercios/detalhe/', commerce.id]);
  }

  goToEntrepreneurs(): void {
    this.router.navigate(['/administrador/usuarios'], {
      queryParams: { role: 'empreendedor' }
    });
  }
}