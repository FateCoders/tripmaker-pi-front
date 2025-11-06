import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-fab-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './fab-button.html',
  styleUrl: './fab-button.scss',
})
export class FabButton {
  @Input() icon: string = '';
  @Input() label: string = '';

  @Output() onClick = new EventEmitter<MouseEvent>();

  onButtonClick(event: MouseEvent): void {
    this.onClick.emit(event);
  }
}
