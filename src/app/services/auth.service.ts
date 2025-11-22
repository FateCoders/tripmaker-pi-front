import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../interfaces/user';
import { UserService } from './user.service'; // 1. Importar a classe

const USER_STORAGE_KEY = 'loggedInUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  // 2. Injetar o serviço corretamente
  private userService = inject(UserService);

  // REMOVIDO: private users = UserService.getAllUsers(); 
  // Motivo: Isso causava o erro e criava dados duplicados/desatualizados.

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

  login(credentials: any): User | null {
    // 3. Buscar a lista atualizada do serviço injetado
    const allUsers = this.userService.getAllUsers();

    const user = allUsers.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      const userToStore: User = { ...user };
      delete (userToStore as any).password;

      this.loggedInUser = userToStore;
      this.saveUserToStorage(userToStore);

      return userToStore;
    }

    return null;
  }

  logout(): void {
    this.loggedInUser = null;
    this.clearUserStorage();
    this.router.navigate(['/']);
  }

  register(user: any): boolean {
    try {
      this.userService.addUser(user).subscribe({
        next: (newUser) => console.log('Usuário registrado:', newUser),
        error: (err) => console.error(err)
      });

      return true;
    } catch (e) {
      console.error('Erro ao registrar:', e);
      return false;
    }
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