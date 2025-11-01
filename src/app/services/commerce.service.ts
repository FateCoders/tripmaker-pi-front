import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Commerce } from '../interfaces/commerce';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {
  private allBusinesses: Commerce[] = [
    {
      id: 'b-1',
      name: 'Nome do comercio',
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
    },
  ];


  getCommerceForUser(): Observable<Commerce[]> {
    return of(this.allBusinesses).pipe(delay(500));
  }
}