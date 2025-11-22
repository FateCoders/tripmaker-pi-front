import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User, UserRole } from '../interfaces/user';

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
    { id: 'admin-1', name: 'Houdini', email: 'houdini@tripmaker.com', role: 'administrador', region: 'sorocaba', creationDate: dateDaysAgo(200), password: '123123123' },
    { id: 'admin-2', name: 'Jhon Joe', email: 'j.joe@tripmaker.com', role: 'administrador', region: 'campinas', creationDate: dateDaysAgo(150), password: '123123123' },
    { id: 'admin-3', name: 'Lobert', email: 'lobert@tripmaker.com', role: 'administrador', region: 'tatui', creationDate: dateDaysAgo(30), password: '123123123' },
    { id: 'via-1', name: 'Ding Ding Dong', email: 'ding@email.com', role: 'viajante', region: 'tatui', creationDate: dateDaysAgo(2), password: '123123123' },
    { id: 'via-2', name: 'Norbt', email: 'norbt@email.com', role: 'viajante', region: 'sorocaba', creationDate: dateDaysAgo(5), password: '123123123' },
    { id: 'via-3', name: 'Hospedia', email: 'hospedia@email.com', role: 'viajante', region: 'campinas', creationDate: dateDaysAgo(10), password: '123123123' },
    { id: 'via-4', name: 'Teste Viajante', email: 'teste@email.com', role: 'viajante', region: 'sorocaba', creationDate: dateDaysAgo(45), password: '123123123' },
    { id: 'via-5', name: 'Mais um Viajante', email: 'maisum@email.com', role: 'viajante', region: 'tatui', creationDate: dateDaysAgo(100), password: '123123123' },
    { id: 'emp-1', name: 'Walter', email: 'walter@negocio.com', role: 'empreendedor', region: 'sorocaba', creationDate: dateDaysAgo(8), password: '123123123' },
    { id: 'emp-2', name: 'Pikman', email: 'pikman@negocio.com', role: 'empreendedor', region: 'campinas', creationDate: dateDaysAgo(60), password: '123123123' },
    { id: 'emp-3', name: 'Saul Goodman', email: 'saul@negocio.com', role: 'empreendedor', region: 'tatui', creationDate: dateDaysAgo(120), password: '123123123' },
    { id: 'promo-1', name: 'Promotor Teste', email: 'promotor@eventos.com', role: 'promotor_turistico', region: 'tatui', creationDate: dateDaysAgo(3), password: '123123123' },
    { id: 'promo-2', name: 'Promotor 2', email: 'promotor2@eventos.com', role: 'promotor_turistico', region: 'sorocaba', creationDate: dateDaysAgo(90), password: '123123123' },
  ];

  constructor() { }

  // Renomeado de Mock para o nome tradicional
  getAllUsers(): User[] {
    return JSON.parse(JSON.stringify(this.allUsers));
  }

  getUsersByRole(type: UserRole, searchTerm: string = ''): Observable<User[]> {
    const term = searchTerm.toLowerCase();
    return of(this.getAllUsers()).pipe(
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

  getUserById(id: string): Observable<User | undefined> {
    const user = this.allUsers.find((u) => u.id === id);
    return of(user).pipe(delay(300));
  }

  addUser(userData: Omit<User, 'id'>): Observable<User> {
    const newUser: User = {
      ...userData,
      id: `new-user-${Math.floor(Math.random() * 1000)}`,
      creationDate: new Date(),
      // @ts-ignore
      region: userData.region || 'sorocaba',
    };
    // @ts-ignore
    this.allUsers.push(newUser);
    return of(newUser).pipe(delay(500));
  }

  updateUser(updatedUser: User): Observable<boolean> {
    const index = this.allUsers.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      this.allUsers[index] = updatedUser;
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  deleteUser(id: string): Observable<boolean> {
    const initialLength = this.allUsers.length;
    this.allUsers = this.allUsers.filter((user) => user.id !== id);
    return of(this.allUsers.length < initialLength).pipe(delay(300));
  }
}