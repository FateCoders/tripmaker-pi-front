import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
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
    {
      id: 'via-4',
      name: 'Teste Viajante',
      email: 'teste@email.com',
      role: 'viajante',
    },
    {
      id: 'via-5',
      name: 'Mais um Viajante',
      email: 'maisum@email.com',
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
    {
      id: 'promo-2',
      name: 'Promotor 2',
      email: 'promotor2@eventos.com',
      role: 'promotor',
    },
  ];

  constructor() { }

  // NOVO: Método para retornar todos os usuários (usado pelo DashboardService)
  getAllUsersMock(): User[] {
    return this.allUsers;
  }

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

  addUser(userData: Omit<User, 'id'>): Observable<User> {
    console.log('UserService: Recebido para adicionar:', userData);
    
    const newUser: User = {
      ...userData,
      id: `new-user-${Math.floor(Math.random() * 1000)}`,
    };

    this.allUsers.push(newUser);
    console.log('UserService: Lista atualizada', this.allUsers);

    return of(newUser).pipe(delay(500));
  }
}
