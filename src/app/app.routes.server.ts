import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Rota de Usuário Dinâmica
    path: 'administrador/usuarios/novo/:role',
    renderMode: ('dynamic' as unknown) as RenderMode // Força a string 'dynamic' a ser aceita
  } as ServerRoute, // Força o objeto inteiro a ser aceito como ServerRoute
  {
    // Rota de Evento Dinâmica
    path: 'viajante/eventos/:id',
    renderMode: ('dynamic' as unknown) as RenderMode // Força a string 'dynamic' a ser aceita
  } as ServerRoute,
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
