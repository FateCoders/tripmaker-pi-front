import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User, UserRole } from '../interfaces/user';
import { environment } from '../../environments/environment';

const USER_STORAGE_KEY = 'loggedInUser';
const TOKEN_STORAGE_KEY = 'authToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private apiUrl = environment.backendApiUrl;
  private loggedInUser: User | null = null;
  private isBrowser = isPlatformBrowser(this.platformId);

  private readonly ROLE_ENDPOINTS: Record<string, string> = {
    'viajante': 'traveler',
    'empreendedor': 'entrepreneur',
    'promotor_turistico': 'tourism-promoter',
    'administrador': 'admin'
  };

  private readonly USER_TYPE_MAP: Record<number, UserRole> = {
    0: 'promotor_turistico',
    1: 'viajante',
    2: 'empreendedor',
    3: 'administrador'
  };

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
          console.error(e);
          this.finalizeLogout();
        }
      }
    }
  }

  private saveSession(user: User, token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
    this.loggedInUser = user;
  }

  private clearUserStorage(): void {
    if (this.isBrowser) {
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    this.loggedInUser = null;
  }

  login(credentials: any): Observable<User> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, credentials).pipe(
      switchMap((response) => {
        const token = response.token;
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.get<any>(`${this.apiUrl}/user`, { headers }).pipe(
          map((backendUser) => {
            const user: User = {
              id: backendUser.id.toString(),
              name: backendUser.name,
              email: backendUser.email,
              role: this.USER_TYPE_MAP[backendUser.user_type] || 'viajante',
              creationDate: backendUser.created_at,
              region: 'tatui'
            };

            this.saveSession(user, token);
            return user;
          })
        );
      }),
      catchError(this.handleError)
    );
  }

  register(user: any): Observable<any> {
    const endpointSlug = this.ROLE_ENDPOINTS[user.role];

    if (!endpointSlug) {
      return throwError(() => new Error(`Tipo de usuário '${user.role}' não suportado para registro.`));
    }

    const payload = {
      name: user.businessName || user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      cnpj: user.cnpj,
      region: user.region || 'tatui'
    };

    return this.http.post(`${this.apiUrl}/register/${endpointSlug}`, payload).pipe(
      catchError(this.handleError)
    );
  }

  logout(): void {
    const token = this.isBrowser ? localStorage.getItem(TOKEN_STORAGE_KEY) : null;

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.post(`${this.apiUrl}/user/logout`, {}, { headers }).subscribe({
        next: () => this.finalizeLogout(),
        error: (err) => {
          console.error('Erro ao realizar logout na API', err);
          this.finalizeLogout();
        }
      });
    } else {
      this.finalizeLogout();
    }
  }

  private finalizeLogout(): void {
    this.clearUserStorage();
    this.router.navigate(['/']);
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

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro inesperado.';
    if (error.status === 401) {
      errorMessage = 'Credenciais inválidas.';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else if (error.status === 0) {
      errorMessage = 'Erro de conexão com o servidor.';
    }
    return throwError(() => new Error(errorMessage));
  }
}