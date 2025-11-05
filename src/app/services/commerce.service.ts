import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Commerce } from '../interfaces/commerce';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {
  private allBusinesses: Commerce[] = [
    {
      id: 'b-1',
      name: 'Conservatório de Tatuí',
      address: 'Praça da Matriz, Tatuí - SP',
      logoUrl: 'assets/images/png/local-entrepreneur.png',
      visitors: '2.5K',
      rating: 5,
      priceRange: '$$ - $$$',
      hours: '00h00 - 00h00',
      category: 'Comércio',
      routesCount: 13,
      monthlyVisitors: 235,
      location: {
        query: 'Conservatório de Tatuí, Tatuí - SP',
      },
      description: '',
      caracteristicas: ['Wi-Fi', 'Estacionamento', 'Acessível'],
    },
    {
      id: 'b-2',
      name: 'Floricultura Ternura',
      address: 'Rua das Flores, 123 - Tatuí - SP',
      logoUrl: 'assets/images/png/commom-user.png',
      visitors: '1.2K',
      rating: 4,
      priceRange: '$$',
      hours: '09h00 - 18h00',
      category: 'Loja',
      routesCount: 5,
      monthlyVisitors: 120,
      location: {
        query: 'Rua das Flores, 123, Tatuí - SP',
      },
      description: '',
      caracteristicas: []
    },
  ];

  private activeCommerceId = new BehaviorSubject<string | null>(null);

  getAllCommercesForUserMock(): Commerce[] {
    return this.allBusinesses;
  }

  getAllCommercesForUser(): Observable<Commerce[]> {
    return of(this.allBusinesses).pipe(delay(500));
  }

  selectCommerce(id: string): void {
    this.activeCommerceId.next(id);
  }

  getActiveCommerce(): Observable<Commerce | null> {
    return this.activeCommerceId.pipe(
      switchMap(activeId => {
        return this.getAllCommercesForUser().pipe(
          map(commerces => {
            if (commerces.length === 0) {
              return null;
            }

            if (activeId) {
              const found = commerces.find(c => c.id === activeId);
              if (found) {
                return found;
              }
            }

            this.activeCommerceId.next(commerces[0].id);
            return commerces[0];
          })
        );
      })
    );
  }

  getCommerceById(id: string): Observable<Commerce | null> {
    const foundCommerce = this.allBusinesses.find(c => c.id === id);
    return of(foundCommerce || null).pipe(delay(300));
  }

  registerCommerce(commerceData: Commerce): Observable<boolean> {
    this.allBusinesses.push(commerceData);
    return of(true).pipe(delay(500));
  }
}
