import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TabsListItem } from '../../models/tabs-list-item/tabs-list-item';
import { MatDividerModule, MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-list-card',
  imports: [MatCardModule, MatDivider],
  templateUrl: './list-card.html',
  styleUrl: './list-card.scss'
})
export class ListCard {
  @Input() item!: TabsListItem;
}
