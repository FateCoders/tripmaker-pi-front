import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn(){
    return true
  }

  getUserRole(){
    return 'viajante'
  }
}
