import { Component } from '@angular/core';
import { MatListModule } from "@angular/material/list";


export interface Item {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-tile-list-item',
  imports: [MatListModule],
  templateUrl: './tile-list-item.html',
  styleUrl: './tile-list-item.scss'
})
export class TileListItem {
  items: Item[] = [
    { icon: 'location_on', title: 'Localização', description: 'Localização em tempo real para registro de eventos e rotas.'},
    { icon: 'location_on', title: 'Localização', description: 'Localização em tempo real para registro de eventos e rotas.'},
    { icon: 'location_on', title: 'Localização', description: 'Localização em tempo real para registro de eventos e rotas.'},
    { icon: 'location_on', title: 'Localização', description: 'Localização em tempo real para registro de eventos e rotas.'},
  ]
}
