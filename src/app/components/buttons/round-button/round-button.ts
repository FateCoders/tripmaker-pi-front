import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-round-button',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './round-button.html',
  styleUrl: './round-button.scss',
})

export class RoundButton {
  @Input() icon: string = '';
  @Input() href: string = '';
  @Input() label: string = '';
  @Input() isDisabled: boolean = false;
  @Input() onClick: () => void = () => {};
}
