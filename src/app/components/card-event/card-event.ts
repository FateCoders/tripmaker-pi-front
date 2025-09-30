import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IDefaultCardItem } from '../../interfaces/default-card-item';
import { IEvent } from '../../interfaces/event';

@Component({
  selector: 'app-card-event',
  imports: [MatCardModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './card-event.html',
  styleUrl: './card-event.scss'
})
export class CardEvent {
  @Input() item!: IEvent;
}
