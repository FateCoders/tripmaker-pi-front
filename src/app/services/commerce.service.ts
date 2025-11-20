// src/app/services/commerce.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { Commerce } from '../interfaces/commerce';

// Helper para datas (hoje - N dias)
const dateDaysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

@Injectable({
  providedIn: 'root',
})
export class CommerceService {
  private allBusinesses: Commerce[] = [
    {
      id: 'b-1',
      ownerId: 'emp-3', // Associado ao Saul Goodman
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
      region: 'tatui',
      creationDate: dateDaysAgo(40),
    },
    {
      id: 'b-2',
      ownerId: 'emp-1', // Associado ao Walter
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
      caracteristicas: [],
      region: 'tatui',
      creationDate: dateDaysAgo(5),
    },
    {
      id: 'b-3',
      ownerId: 'emp-2', // Associado ao Pikman
      name: 'Shopping Iguatemi',
      address: 'Av. Gisele Constantino, Sorocaba - SP',
      logoUrl: 'assets/images/png/commom-user.png',
      visitors: '10.5K',
      rating: 4.8,
      priceRange: '$$$',
      hours: '10h00 - 22h00',
      category: 'Shopping',
      routesCount: 2,
      monthlyVisitors: 1500,
      location: {
        query: 'Iguatemi Esplanada, Sorocaba - SP',
      },
      description: '',
      caracteristicas: ['Wi-Fi', 'Estacionamento', 'Acessível', 'Pet Friendly'],
      region: 'sorocaba',
      creationDate: dateDaysAgo(120),
    },
    {
      id: 'b-4',
      ownerId: 'emp-2', // Associado ao Pikman
      name: 'Parque Dom Pedro',
      address: 'Av. Guilherme Campos, Campinas - SP',
      logoUrl: 'assets/images/png/local-entrepreneur.png',
      visitors: '12K',
      rating: 4.9,
      priceRange: '$$$',
      hours: '10h00 - 22h00',
      category: 'Shopping',
      routesCount: 1,
      monthlyVisitors: 1800,
      location: {
        query: 'Parque Dom Pedro, Campinas - SP',
      },
      description: '',
      caracteristicas: ['Wi-Fi', 'Estacionamento', 'Acessível', 'Pet Friendly'],
      region: 'campinas',
      creationDate: dateDaysAgo(200),
    },
  ];

  private activeCommerceId = new BehaviorSubject<string | null>(null);

  getAllCommercesForUserMock(): Commerce[] {
    // Retornamos uma cópia para garantir que os filtros em outros
    // lugares não modifiquem a fonte original
    return JSON.parse(JSON.stringify(this.allBusinesses));
  }

  getAllCommercesForUser(): Observable<Commerce[]> {
    return of(this.getAllCommercesForUserMock()).pipe(delay(500));
  }

  // NOVO MÉTODO: Filtra comércios pelo ID do dono
  getCommercesByOwnerId(ownerId: string): Observable<Commerce[]> {
    const userCommerces = this.allBusinesses.filter(c => c.ownerId === ownerId);
    return of(userCommerces).pipe(delay(300));
  }

  selectCommerce(id: string): void {
    this.activeCommerceId.next(id);
  }

  getActiveCommerce(): Observable<Commerce | null> {
    return this.activeCommerceId.pipe(
      switchMap((activeId) => {
        return this.getAllCommercesForUser().pipe(
          map((commerces) => {
            if (commerces.length === 0) {
              return null;
            }

            if (activeId) {
              const found = commerces.find((c) => c.id === activeId);
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
    const foundCommerce = this.allBusinesses.find((c) => c.id === id);
    return of(foundCommerce || null).pipe(delay(300));
  }

  registerCommerce(commerceData: Commerce): Observable<boolean> {
    const newCommerce = {
      ...commerceData,
      creationDate: new Date(),
      region: 'tatui',
    };
    this.allBusinesses.push(newCommerce);
    return of(true).pipe(delay(500));
  }
}