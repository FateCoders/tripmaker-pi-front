import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IEvent } from '../../interfaces/event';

@Component({
  selector: 'app-card-default',
  imports: [MatCardModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './card-default.html',
  styleUrls: ['./card-default.scss']
})
export class CardDefault {
  @Input() item!: IEvent;
}
