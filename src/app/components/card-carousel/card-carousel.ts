import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteCardComponent } from '../route-card/route-card';
import { RouteCardItem } from '../../interfaces/route-card-item';

@Component({
  selector: 'app-card-carousel',
  standalone: true,
  imports: [CommonModule, RouteCardComponent],
  templateUrl: './card-carousel.html',
  styleUrls: ['./card-carousel.scss'],
})
export class CardCarouselComponent {
  @Input({ required: true }) items: RouteCardItem[] = [];

  onAddClick(item: RouteCardItem): void {
    console.log('Adicionar ao Roteiro:', item.id);
  }

  onViewClick(item: RouteCardItem): void {
    console.log('Ver mais:', item.id);
  }
}