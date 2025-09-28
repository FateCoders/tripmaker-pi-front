import { Injectable, inject } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private authService = inject(AuthService);
  userRole = this.authService.getUserRole();

  private routes = {
    admin: [
      {path: '/administrador/inicio', label: 'Início', icon: 'home'},
      {path: '/administrador/eventos', label: 'Eventos', icon: 'event'},
      {path: '/administrador/comercios', label: 'Comércios', icon: 'store'},
      {path: '/administrador/usuarios', label: 'Usuários', icon: 'group'},
      {path: '/administrador/perfil', label: 'Perfil', icon: 'person'},
    ],
    empreendedor: [
      {path: '/empreendedor/inicio', label: 'Início', icon: 'home'},
      {path: '/empreendedor/comercios', label: 'Comércios', icon: 'store'},
      {path: '/empreendedor/perfil', label: 'Perfil', icon: 'person'},
    ],
    promotor_turistico: [
      {path: '/promotor-turistico/inicio', label: 'Início', icon: 'home'},
      {path: '/promotor-turistico/eventos', label: 'Eventos', icon: 'event'},
      {path: '/promotor-turistico/mapa', label: 'Mapa', icon: 'map'},
      {path: '/promotor-turistico/perfil', label: 'Perfil', icon: 'person'},
    ],
    viajante: [
      {path: '/viajante/inicio', label: 'Início', icon: 'home'},
      {path: '/viajante/eventos', label: 'Eventos', icon: 'event'},
      {path: '/viajante/roteiros', label: 'Roteiros', icon: 'map'},
      {path: '/viajante/perfil', label: 'Perfil', icon: 'person'},
    ]
  };

  getUserRoutes() {
    if (this.userRole === 'administrador') {
      return this.routes.admin;
    } else if (this.userRole === 'empreendedor') {
      return this.routes.empreendedor;
    } else if (this.userRole === 'promotor_turistico') {
      return this.routes.promotor_turistico;
    } else if (this.userRole === 'viajante') {
      return this.routes.viajante;
    }
    return [];
  }
}
