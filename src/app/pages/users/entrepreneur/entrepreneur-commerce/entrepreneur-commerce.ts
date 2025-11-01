import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { CommerceService } from '../../../../services/commerce.service';
import { Commerce } from '../../../../interfaces/commerce';
import { Observable } from 'rxjs';

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
  private router = inject(Router);

  commerces$!: Observable<Commerce[]>;
  isLoading = true;

  ngOnInit(): void {
    this.commerces$ = this.commerceService.getAllCommercesForUser();
    this.commerces$.subscribe(() => this.isLoading = false);
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