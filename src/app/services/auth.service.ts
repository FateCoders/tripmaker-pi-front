import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);

  private users: any[] = [
    { email: 'viajante@email.com', password: 'password', role: 'viajante', name: 'Viajante Teste'},
    {
      email: 'empreendedor@email.com',
      password: 'password',
      role: 'empreendedor',
      name: 'Empreendedor Teste',
    },
    {
      email: 'e@e.com',
      password: 'password',
      role: 'promotor-turistico',
      name: 'Promotor Turístico Teste',
    },
  ];

  private loggedInUser: any = null;

  constructor() {}

  login(credentials: any): boolean {
    const user = this.users.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      this.loggedInUser = user;
      this.router.navigate([`/${user.role}/inicio`]);
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedInUser = null;
    this.router.navigate(['/login']);
  }

  register(user: any): void {
    this.users.push(user);
    console.log('Usuários registrados:', this.users);
  }

  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  getUserRole(): string | null {
    return this.loggedInUser ? this.loggedInUser.role : null;
  }

  getCurrentUser(): any {
    return this.loggedInUser;
  }
}
