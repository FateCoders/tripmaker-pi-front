import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'empreendedor/avaliacoes/:id',
    renderMode: ('dynamic' as unknown) as RenderMode
  } as ServerRoute,
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
    path: 'administrador/avaliacoes/:type/:id',
    renderMode: ('dynamic' as unknown) as RenderMode
  } as ServerRoute,
  {
    path: 'promotor_turistico/evento/:id',
    renderMode: ('dynamic' as unknown) as RenderMode
  } as ServerRoute,
  {
    path: 'promotor_turistico/avaliacoes/:type/:id',
    renderMode: ('dynamic' as unknown) as RenderMode
  } as ServerRoute,
  {
    path: 'promotor_turistico/rota/:id',
    renderMode: ('dynamic' as unknown) as RenderMode
  } as ServerRoute,
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];