import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './filter-bar.html',
  styleUrls: ['./filter-bar.scss']
})
export class FilterBar {
  @Input() title: string = 'Filtrar';
  
  @Input() options: { value: string; label: string }[] = [];

  @Output() optionSelected = new EventEmitter<string>();

  onSelect(option: { value: string; label: string }) {
    this.optionSelected.emit(option.value);
  }
}
