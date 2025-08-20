import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TabsListItem } from '../../models/tabs-list-item';

@Component({
  selector: 'app-list-card',
  imports: [MatCardModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './list-card.html',
  styleUrls: ['./list-card.scss']
})
export class ListCard {
  @Input() item!: TabsListItem;
}
