import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouteCardItem } from '../../interfaces/route-card-item'; 

@Component({
  selector: 'app-route-summary-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './route-summary-item.html',
  styleUrls: ['./route-summary-item.scss'],
})
export class RouteSummaryItemComponent {
  @Input({ required: true }) item!: RouteCardItem; 
  @Output() removeItem = new EventEmitter<RouteCardItem>();

  defaultIcons = ['store', 'stairs', 'accessible', 'hotel', 'directions_bus'];

  get itemIcons() {
    return this.item.icons || this.defaultIcons;
  }

  onRemoveClick(): void {
    this.removeItem.emit(this.item);
  }
}