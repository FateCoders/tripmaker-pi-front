import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ConfirmDialog, ConfirmDialogData } from '../confirm-dialog/confirm-dialog';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { TabsListCard } from '../../models/tabs-list-card';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: 'app-card-user',
  imports: [MatCardModule, MatIconModule, MatMenuModule],
  templateUrl: './card-user.html',
  styleUrl: './card-user.scss'
})
export class CardUser {
@Input() item!: TabsListCard;
  @Output() userDeleted = new EventEmitter<string>();

  private dialog = inject(MatDialog);
  private userService = inject(UserService);

  onEditClick(event: Event): void {
    event.stopPropagation();
    console.log('Editar usuário (não implementado):', this.item.id);
  }

  onDeleteClick(event: Event): void {
    event.stopPropagation();

    const dialogData: ConfirmDialogData = {
      title: 'Confirmar Exclusão',
      message: `Tem certeza de que deseja excluir o usuário "${this.item.title}"? Esta ação não pode ser desfeita.`,
      confirmText: 'Excluir'
    };

    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: dialogData,
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.userService.deleteUser(this.item.id).subscribe({
          next: () => {
            console.log('Usuário excluído:', this.item.id);
            this.userDeleted.emit(this.item.id);
          },
          error: (err) => {
            console.error('Erro ao excluir usuário:', err);
          }
        });
      }
    });
  }
}
