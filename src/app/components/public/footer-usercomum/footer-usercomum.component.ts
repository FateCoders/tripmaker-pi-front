import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-footer-usercomum',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './footer-usercomum.component.html',
  styleUrl: './footer-usercomum.component.scss'
})
export class FooterUsercomumComponent {

}