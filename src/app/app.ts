import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// 1. Importe as animações
import { routeAnimations } from './animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  // 2. Adicione 'animations' ao decorator
  animations: [ routeAnimations ] 
})
export class App {
  protected readonly title = signal('frontend-tripmaker');

  // 3. Adicione este método
  // Este método lê os dados da rota (que definiremos no Passo 4)
  getRouteAnimationData(outlet: RouterOutlet) {
    return outlet && 
           outlet.activatedRouteData && 
           outlet.activatedRouteData['animation'];
  }
}