import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MapItem } from '../map-item-card/map-item-card'; // Reutilizando a interface
import { RouteCardItem } from '../../interfaces/route-card-item';

@Component({
  selector: 'app-route-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './route-card.html',
  styleUrls: ['./route-card.scss'],
})
export class RouteCardComponent {
  @Input({ required: true }) item!: RouteCardItem;
  @Output() addClick = new EventEmitter<RouteCardItem>();
  @Output() viewClick = new EventEmitter<RouteCardItem>();

  defaultIcons = ['store', 'stairs', 'accessible', 'hotel', 'directions_bus'];

  get itemIcons() {
    return this.item.icons || this.defaultIcons;
  }

  onAddClick(): void {
    this.addClick.emit(this.item);
  }

  onViewClick(): void {
    this.viewClick.emit(this.item);
  }
}