import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface MapItem {
  id: string;
  image: string;
  title: string;
  category: string;
  rating: number;
  distance: string;
  details: string; 
  duration?: string;
  icons?: string[];
}
@Component({
  selector: 'app-map-item-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './map-item-card.html',
  styleUrls: ['./map-item-card.scss'],
})
export class MapItemCardComponent {
  @Input() item!: MapItem;
  @Output() cardClick = new EventEmitter<void>();

  get stars() {
    return Array(5)
      .fill(false)
      .map((_, i) => i < this.item.rating);
  }

  onCardClick() {
    this.cardClick.emit();
  }
}
