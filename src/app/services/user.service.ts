// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User, UserRole } from '../interfaces/user';

// Helper para datas (hoje - N dias)
const dateDaysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

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
      region: 'sorocaba',
      creationDate: dateDaysAgo(200),
    },
    {
      id: 'admin-2',
      name: 'Jhon Joe',
      email: 'j.joe@tripmaker.com',
      role: 'administrador',
      region: 'campinas',
      creationDate: dateDaysAgo(150),
    },
    {
      id: 'admin-3',
      name: 'Lobert',
      email: 'lobert@tripmaker.com',
      role: 'administrador',
      region: 'tatui',
      creationDate: dateDaysAgo(30),
    },

    // Viajantes
    {
      id: 'via-1',
      name: 'Ding Ding Dong',
      email: 'ding@email.com',
      role: 'viajante',
      region: 'tatui',
      creationDate: dateDaysAgo(2), // 2 dias atrás
    },
    {
      id: 'via-2',
      name: 'Norbt',
      email: 'norbt@email.com',
      role: 'viajante',
      region: 'sorocaba',
      creationDate: dateDaysAgo(5), // 5 dias atrás
    },
    {
      id: 'via-3',
      name: 'Hospedia',
      email: 'hospedia@email.com',
      role: 'viajante',
      region: 'campinas',
      creationDate: dateDaysAgo(10), // 10 dias atrás
    },
    {
      id: 'via-4',
      name: 'Teste Viajante',
      email: 'teste@email.com',
      role: 'viajante',
      region: 'sorocaba',
      creationDate: dateDaysAgo(45), // 45 dias atrás
    },
    {
      id: 'via-5',
      name: 'Mais um Viajante',
      email: 'maisum@email.com',
      role: 'viajante',
      region: 'tatui',
      creationDate: dateDaysAgo(100), // 100 dias atrás
    },

    // Empreendedores
    {
      id: 'emp-1',
      name: 'Walter',
      email: 'walter@negocio.com',
      role: 'empreendedor',
      region: 'sorocaba',
      creationDate: dateDaysAgo(8), // 8 dias atrás
    },
    {
      id: 'emp-2',
      name: 'Pikman',
      email: 'pikman@negocio.com',
      role: 'empreendedor',
      region: 'campinas',
      creationDate: dateDaysAgo(60), // 60 dias atrás
    },
    {
      id: 'emp-3',
      name: 'Saul Goodman',
      email: 'saul@negocio.com',
      role: 'empreendedor',
      region: 'tatui',
      creationDate: dateDaysAgo(120), // 120 dias atrás
    },

    // Promotores
    {
      id: 'promo-1',
      name: 'Promotor Teste',
      email: 'promotor@eventos.com',
      role: 'promotor',
      region: 'tatui',
      creationDate: dateDaysAgo(3), // 3 dias atrás
    },
    {
      id: 'promo-2',
      name: 'Promotor 2',
      email: 'promotor2@eventos.com',
      role: 'promotor',
      region: 'sorocaba',
      creationDate: dateDaysAgo(90), // 90 dias atrás
    },
  ];

  constructor() {}

  getAllUsersMock(): User[] {
    // Retornamos uma cópia para garantir que os filtros em outros
    // lugares não modifiquem a fonte original
    return JSON.parse(JSON.stringify(this.allUsers));
  }

  getUsersByRole(
    type: UserRole,
    searchTerm: string = ''
  ): Observable<User[]> {
    const term = searchTerm.toLowerCase();

    return of(this.getAllUsersMock()).pipe(
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
      creationDate: new Date(), // Adiciona data de criação
      // @ts-ignore
      region: userData.region || 'sorocaba', // Adiciona região padrão
    };

    // @ts-ignore
    this.allUsers.push(newUser);
    console.log('UserService: Lista atualizada', this.allUsers);

    return of(newUser).pipe(delay(500));
  }

  deleteUser(id: string): Observable<boolean> {
    const initialLength = this.allUsers.length;
    this.allUsers = this.allUsers.filter((user) => user.id !== id);
    const success = this.allUsers.length < initialLength;

    if (success) {
      console.log('UserService: Usuário deletado', id);
      console.log('UserService: Lista atualizada', this.allUsers);
      return of(true).pipe(delay(300));
    } else {
      console.warn('UserService: Usuário não encontrado para deletar', id);
      return of(false).pipe(delay(300));
    }
  }
}