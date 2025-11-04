import { Component, Input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";


@Component({
  selector: 'app-chip',
  imports: [MatIcon, MatChipsModule],
  templateUrl: './chip.html',
  styleUrl: './chip.scss',
})
export class Chip {
  @Input() label: string = '';
  @Input() icon: string = '';
}
