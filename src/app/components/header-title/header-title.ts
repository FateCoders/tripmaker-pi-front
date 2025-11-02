import { Component, Input, Output, EventEmitter } from '@angular/core';  
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 

@Component({
  selector: 'app-header-title',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './header-title.html',
  styleUrls: ['./header-title.scss'],
})
export class HeaderTitle {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() showBackButton: boolean = false;
  @Input() showResetButton: boolean = false;

  @Output() backClick = new EventEmitter<void>();
  @Output() resetClick = new EventEmitter<void>();

  onBackClick(): void {
    this.backClick.emit();
  }

  onResetClick(): void {
    this.resetClick.emit();
  }
}