import { Component, Input } from '@angular/core';
import { TabsListCard } from '../../models/tabs-list-card';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-card-favorite',
  imports: [MatCardModule],
  templateUrl: './card-favorite.html',
  styleUrl: './card-favorite.scss'
})
export class CardFavorite {
  @Input() item!: TabsListCard;
}
