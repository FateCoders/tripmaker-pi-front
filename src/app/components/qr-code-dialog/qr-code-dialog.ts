import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-qr-code-dialog',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="qr-container">
      <div class="spacer"></div>

      <div class="qr-content">
        <img src="assets/images/png/qrcode-mock.png" alt="QR Code" class="qr-image" 
             onerror="this.src='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TripMakerEntryCode'" />
        
        <p class="qr-instruction">Escaneie na entrada do evento</p>
      </div>

      <div class="footer-action">
        <button mat-flat-button class="close-btn" (click)="close()">
          <mat-icon>close</mat-icon> Fechar
        </button>
      </div>
    </div>
  `,
  styles: [`
    .qr-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: 24px;
      background: #fff;
      text-align: center;
    }

    .spacer {
      flex: 1;
    }

    .qr-content {
      flex: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .qr-image {
      width: 220px;
      height: 220px;
      margin-bottom: 16px;
      // Filtro para garantir que fique cinza escuro como na imagem, se for preto puro
      opacity: 0.8; 
    }

    .qr-instruction {
      font-size: 1rem;
      color: #888; /* Cinza claro */
      font-weight: 500;
      margin: 0;
    }

    .footer-action {
      flex: 1;
      display: flex;
      align-items: flex-end;
      padding-bottom: 20px;
    }

    .close-btn {
      background-color: #03A9F4; /* Azul Ciano */
      color: white;
      border-radius: 24px;
      padding: 0 32px;
      height: 48px;
      font-size: 1rem;
      font-weight: 500;
    }
  `]
})
export class QrCodeDialog {
  private dialogRef = inject(MatDialogRef<QrCodeDialog>);

  close(): void {
    this.dialogRef.close();
  }
}