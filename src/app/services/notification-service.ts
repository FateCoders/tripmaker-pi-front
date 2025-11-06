import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

type NotificationType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private snackBar = inject(MatSnackBar);

  open(message: string, action: string = 'Fechar', type: NotificationType = 'error'): void {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: [`snackbar-${type}`]
    });
  }
}