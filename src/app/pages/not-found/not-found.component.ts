import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

import { LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  options: AnimationOptions = {
    path: '/assets/lottie/404_animation.json',
  };

  constructor(private router: Router) {}

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}