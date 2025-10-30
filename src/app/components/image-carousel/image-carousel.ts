import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-carousel.html',
  styleUrls: ['./image-carousel.scss'],
})
export class ImageCarouselComponent {
  @Input({ required: true }) images: string[] = [];
}