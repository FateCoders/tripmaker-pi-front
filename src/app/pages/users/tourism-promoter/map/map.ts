import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { SearchBarComponent } from '../../../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-tourism-promoter-map',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FooterUsercomumComponent,
    SearchBarComponent,
  ],
  templateUrl: './tourism-promoter-map.component.html',
  styleUrl: './tourism-promoter-map.component.scss',
})
export class TourismPromoterMapComponent {
  searchTerm: string = '';

  constructor(private router: Router) {}
}