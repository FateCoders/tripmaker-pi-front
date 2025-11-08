import { Component, OnInit, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { TabsList } from '../../../../components/tabs-list/tabs-list';
import { ListView } from '../../../../components/list-view/list-view';
import { User, UserRole } from '../../../../interfaces/user';
import { TabsListCard } from '../../../../models/tabs-list-card';
import { TabsSection } from '../../../../models/tabs-section';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router'; // Importar o Router

@Component({
  selector: 'app-administrator-users',
  standalone: true,
  imports: [
    CommonModule,
    HeaderTitle,
    FooterUsercomumComponent,
    TabsList, ListView, MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class AdministratorUsers implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router); // Injetar o Router

  currentItems: WritableSignal<TabsListCard[]> = signal([]);
  isLoading = signal(true);

  // Rastreia o role da aba ativa
  private currentRole: UserRole = 'administrador';

  tabs: TabsSection[] = [
    { label: 'Administrador', content: [] },
    { label: 'Viajante', content: [] },
    { label: 'Empreendedor Local', content: [] },
    { label: 'Promotor', content: [] },
  ];

  private tabTypes: UserRole[] = ['administrador', 'viajante', 'empreendedor', 'promotor'];

  ngOnInit(): void {
    this.onTabChanged(0);
  }

  refreshData(): void {
    console.log('AdministratorUsers: Atualizando lista para o role:', this.currentRole);
    this.isLoading.set(true);

    this.userService.getUsersByRole(this.currentRole, '').subscribe(users => {
      this.currentItems.set(this.transformUsersToCards(users));
      this.isLoading.set(false);
    });
  }

  onTabChanged(index: number): void {
    this.isLoading.set(true);
    const tabType = this.tabTypes[index];
    this.currentRole = tabType;

    this.userService.getUsersByRole(tabType, '').subscribe(users => {
      this.currentItems.set(this.transformUsersToCards(users));
      this.isLoading.set(false);
    });
  }

  private transformUsersToCards(users: User[]): TabsListCard[] {
    return users.map(user => ({
      id: user.id,
      title: user.name,
      description: user.email || 'Usuário sem email',
      img: this.getAvatarForRole(user.role), category: user.role,
    }));
  }

  private getAvatarForRole(role: UserRole): string {
    switch (role) {
      case 'empreendedor':
        return 'assets/images/png/local-entrepreneur.png';
      case 'promotor':
        return 'assets/images/png/tourism-promoter.png';
      case 'viajante':
        return 'assets/images/png/commom-user.png';
      case 'administrador':
        return 'assets/images/png/commom-user.png'; default:
        return 'assets/images/png/commom-user.png';
    }
  }

  createNewUser(): void {
    this.router.navigate(['/administrador/usuarios/novo', this.currentRole]);
  }

}