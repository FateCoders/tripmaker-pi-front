import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserRole } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private allUsers: User[] = [
    // Administradores
    {
      id: 'admin-1',
      name: 'Houdini',
      email: 'houdini@tripmaker.com',
      role: 'administrador',
    },
    {
      id: 'admin-2',
      name: 'Jhon Joe',
      email: 'j.joe@tripmaker.com',
      role: 'administrador',
    },
    {
      id: 'admin-3',
      name: 'Lobert',
      email: 'lobert@tripmaker.com',
      role: 'administrador',
    },

    // Viajantes
    {
      id: 'via-1',
      name: 'Ding Ding Dong',
      email: 'ding@email.com',
      role: 'viajante',
    },
    {
      id: 'via-2',
      name: 'Norbt',
      email: 'norbt@email.com',
      role: 'viajante',
    },
    {
      id: 'via-3',
      name: 'Hospedia',
      email: 'hospedia@email.com',
      role: 'viajante',
    },

    // Empreendedores
    {
      id: 'emp-1',
      name: 'Walter',
      email: 'walter@negocio.com',
      role: 'empreendedor',
    },
    {
      id: 'emp-2',
      name: 'Pikman',
      email: 'pikman@negocio.com',
      role: 'empreendedor',
    },
    {
      id: 'emp-3',
      name: 'Saul Goodman',
      email: 'saul@negocio.com',
      role: 'empreendedor',
    },

    // Promotores
    {
      id: 'promo-1',
      name: 'Promotor Teste',
      email: 'promotor@eventos.com',
      role: 'promotor',
    },
  ];

  constructor() { }

  getUsersByRole(
    type: UserRole,
    searchTerm: string = ''
  ): Observable<User[]> {
    const term = searchTerm.toLowerCase();

    return of(this.allUsers).pipe(
      map((users) =>
        users.filter(
          (user) =>
            user.role === type &&
            (user.name.toLowerCase().includes(term) ||
              user.email?.toLowerCase().includes(term))
        )
      )
    );
  }
}