import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../interfaces/user';

const USER_STORAGE_KEY = 'loggedInUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private users: User[] = [
    {
      id: '1',
      email: 'viajante@email.com',
      password: 'password',
      role: 'viajante',
      name: 'Viajante Teste',
    },
    {
      id: '2',
      email: 'empreendedor@email.com',
      password: 'password',
      role: 'empreendedor',
      name: 'Empreendedor Teste',
    },
    {
      id: '3',
      email: 'administrador@email.com',
      password: 'password',
      role: 'administrador',
      name: 'Administrador Teste',
    },
  ];

  private loggedInUser: User | null = null;
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    if (this.isBrowser) {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        try {
          this.loggedInUser = JSON.parse(storedUser);
        } catch (e) {
          console.error('Erro ao parsear usuário do localStorage:', e);
          localStorage.removeItem(USER_STORAGE_KEY);
        }
      }
    }
  }

  private saveUserToStorage(user: User): void {
    if (this.isBrowser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
  }

  private clearUserStorage(): void {
    if (this.isBrowser) {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }

  login(credentials: any): boolean {
    const user = this.users.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      const userToStore: User = { ...user };
      delete (userToStore as any).password;

      this.loggedInUser = userToStore;
      this.saveUserToStorage(userToStore);

      this.router.navigate([`/${user.role}/inicio`]);
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedInUser = null;
    this.clearUserStorage();
    this.router.navigate(['/']);
  }

  register(user: any): void {
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      ...user,
    };
    this.users.push(newUser);
    console.log('Usuários registrados:', this.users);
  }

  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  getUserRole(): string | null {
    return this.loggedInUser ? this.loggedInUser.role : null;
  }

  getCurrentUser(): User | null {
    return this.loggedInUser;
  }
}
