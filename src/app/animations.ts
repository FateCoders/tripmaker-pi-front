import { trigger, transition, style, query, animate } from '@angular/animations';

export const routeAnimations =
  trigger('routeAnimations', [
    // Isso vai disparar em CADA mudança de rota ('* <=> *')
    transition('* <=> *', [
      // 1. Oculta a nova página (que está entrando)
      query(':enter', 
        [
          style({
            position: 'absolute',
            width: '100%',
            opacity: 0,
            transform: 'translateY(20px)' // Começa um pouco abaixo
          })
        ],
        { optional: true }
      ),

      // 2. Anima a nova página para a visão
      query(':enter',
        [
          animate('400ms ease-out', 
            style({ 
              opacity: 1, 
              transform: 'translateY(0)' // Move para a posição final
            })
          )
        ],
        { optional: true }
      )
    ])
  ]);