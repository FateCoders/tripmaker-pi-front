import { CommonModule, NgStyle } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-round-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './round-button.html',
  styleUrl: './round-button.scss',
})
export class RoundButton {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() isDisabled: boolean = false;

  @Input() width: string = 'auto';
  @Input() height: string = 'auto';


  @Output() onClick = new EventEmitter<MouseEvent>();

  onButtonClick(event: MouseEvent): void {
    this.onClick.emit(event);
  }

  getButtonStyles() {
    return {
      width: this.width,
      height: this.height,
    };
  }
}
