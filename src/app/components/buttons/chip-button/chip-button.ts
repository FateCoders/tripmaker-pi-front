import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-chip-button',
  imports: [MatChipsModule, MatIconModule, CommonModule],
  templateUrl: './chip-button.html',
  styleUrl: './chip-button.scss',
})
export class ChipButton {
  @Input() label: string = '';
  @Input() icon: string = '';
}
