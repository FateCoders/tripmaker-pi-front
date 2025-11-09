import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TabsListCard } from '../../models/tabs-list-card';

@Component({
  selector: 'app-card-default',
  imports: [MatCardModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './card-default.html',
  styleUrls: ['./card-default.scss'],
})
export class ListCard {
  @Input() item!: TabsListCard;
  @Output() cardClick = new EventEmitter<TabsListCard>();

  onCardClick(): void {
    this.cardClick.emit(this.item);
  }
}
