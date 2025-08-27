import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-title.html',
  styleUrls: ['./header-title.scss']
})
export class HeaderTitle {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
