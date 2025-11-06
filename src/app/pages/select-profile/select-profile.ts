import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../../interfaces/profile';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProfileImg } from "../../components/profile-img/profile-img";

@Component({
  selector: 'app-select-profile',
  imports: [CommonModule, NgStyle, MatCardModule, MatButtonModule, MatIconModule, ProfileImg],
  templateUrl: './select-profile.html',
  styleUrl: './select-profile.scss',
})
export class SelectProfile {
  private router = inject(Router);

  currentIndex = signal(1);

  profiles: Profile[] = [
    {
      type: 'promoter',
      title: 'Promotor Turístico',
      description:
        'Divulgue roteiros e eventos únicos! Conecte-se com quem quer explorar sua região.',
      imageUrl: 'assets/images/png/tourism-promoter.png',
      patternUrl: 'assets/images/png/pattern-1.png',
    },
    {
      type: 'traveler',
      title: 'Viajante',
      description:
        'Descubra, planeje e viva experiências incríveis. Tudo o que você precisa para viajar está aqui!',
      imageUrl: 'assets/images/png/commom-user.png',
      patternUrl: 'assets/images/png/pattern-2.png',
    },
    {
      type: 'entrepreneur',
      title: 'Empreendedor Local',
      description: 'Divulgue seu negócio, atraia mais turistas e aumente suas vendas!',
      imageUrl: 'assets/images/png/local-entrepreneur.png',
      patternUrl: 'assets/images/png/pattern-3.png',
    },
  ];

  isSwiping = false;
  swipeStartX = 0;
  readonly swipeThreshold = 50; // Distância mínima em pixels para considerar um swipe

  // --- Métodos de Swipe ---

  private getEventX(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
  }

  onSwipeStart(event: MouseEvent | TouchEvent): void {
    if (event instanceof MouseEvent && event.button !== 0) return;
    event.preventDefault();
    this.isSwiping = true;
    this.swipeStartX = this.getEventX(event);
  }

  onSwipeMove(event: MouseEvent | TouchEvent): void {
    if (this.isSwiping) {
      event.preventDefault();
    }
  }

  onSwipeEnd(event: MouseEvent | TouchEvent): void {
    if (!this.isSwiping) return;

    const endX = event instanceof MouseEvent ? event.clientX : event.changedTouches[0].clientX;
    const diffX = this.swipeStartX - endX;

    if (Math.abs(diffX) > this.swipeThreshold) {
      if (diffX > 0) {
        this.nextSlide(); // Arrastou para a esquerda
      } else {
        this.prevSlide(); // Arrastou para a direita
      }
    }
    this.isSwiping = false;
  }

  calculateSlideStyle(index: number) {
    const offset = index - this.currentIndex();
    const absOffset = Math.abs(offset);

    const translateX = offset * 60; // Deslocamento horizontal
    const scale = 1 - absOffset * 0.2; // Reduz a escala para slides adjacentes
    const opacity = absOffset > 1 ? '0' : '0.6'; // Esconde slides distantes
    const zIndex = 10 - absOffset;

    let finalTransform = `translateX(${translateX}%) scale(${scale})`;
    let finalOpacity = opacity;
    let finalFilter = 'grayscale(1)';

    if (offset === 0) {
      finalOpacity = '1';
      finalFilter = 'grayscale(0)';
    }

    return {
      transform: finalTransform,
      opacity: finalOpacity,
      'z-index': zIndex,
      filter: finalFilter,
    };
  }

  goToSlide(index: number) {
    this.currentIndex.set(index);
  }

  nextSlide() {
    const newIndex = (this.currentIndex() + 1) % this.profiles.length;
    this.currentIndex.set(newIndex);
  }

  prevSlide() {
    const newIndex = (this.currentIndex() - 1 + this.profiles.length) % this.profiles.length;
    this.currentIndex.set(newIndex);
  }

  navigateToRegister() {
    const selectedProfile = this.profiles[this.currentIndex()];
    this.router.navigate(['/cadastro'], { queryParams: { tipo: selectedProfile.type } });
  }
}
