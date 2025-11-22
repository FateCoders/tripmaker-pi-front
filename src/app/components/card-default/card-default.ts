import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'; // Importado
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-default',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, 
    MatDividerModule, 
    MatIconModule, 
    MatButtonModule,
    MatMenuModule // Adicionado
  ],
  templateUrl: './card-default.html',
  styleUrls: ['./card-default.scss'],
})
export class ListCard {
  @Input() item!: any; // Usando any para flexibilidade, ou pode manter TabsListCard
  
  @Output() cardClick = new EventEmitter<any>();
  @Output() editClick = new EventEmitter<any>();   // Novo Output
  @Output() deleteClick = new EventEmitter<any>(); // Novo Output

  onCardClick(): void {
    this.cardClick.emit(this.item);
  }

  // Funções para o menu
  onEdit(event: Event): void {
    event.stopPropagation();
    this.editClick.emit(this.item);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.deleteClick.emit(this.item);
  }
}