import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'administrador/usuarios/novo/:role',
    renderMode: ('dynamic' as unknown) as RenderMode
  } as ServerRoute,
  {
    path: 'viajante/eventos/:id',
    renderMode: ('dynamic' as unknown) as RenderMode
  } as ServerRoute,
  {
    path: 'administrador/comercios/detalhe/:id',
    renderMode: ('dynamic' as unknown) as RenderMode
  } as ServerRoute,
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];