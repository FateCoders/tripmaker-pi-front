import { Component, OnInit, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

import { HeaderTitle } from '../../../../components/header-title/header-title';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { TabsList } from '../../../../components/tabs-list/tabs-list';
import { ListView } from '../../../../components/list-view/list-view';
import { User, UserRole } from '../../../../interfaces/user';
import { TabsListCard } from '../../../../models/tabs-list-card';
import { TabsSection } from '../../../../models/tabs-section';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-administrator-users',
  standalone: true,
  imports: [
    CommonModule,
    HeaderTitle,
    FooterUsercomumComponent,
    TabsList,
    ListView,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class AdministratorUsers implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentItems: WritableSignal<TabsListCard[]> = signal([]);
  isLoading = signal(true);

  // Sinal para controlar qual aba está visualmente ativa
  activeTabIndex = signal(0);

  // Rastreia o role da aba ativa para refrescar dados ou criar novo usuário
  private currentRole: UserRole = 'administrador';

  // Definição das Abas
  tabs: TabsSection[] = [
    { label: 'Administrador', content: [] },      // Index 0
    { label: 'Viajante', content: [] },           // Index 1
    { label: 'Empreendedor Local', content: [] }, // Index 2
    { label: 'Promotor', content: [] },           // Index 3
  ];

  // Array auxiliar para mapear o índice da aba para o Role da API
  private tabTypes: UserRole[] = ['administrador', 'viajante', 'empreendedor', 'promotor_turistico'];

  // Mapa para converter o parâmetro da URL (?role=x) para o índice da aba
  private roleTabIndexMap: Record<string, number> = {
    'administrador': 0,
    'viajante': 1,
    'empreendedor': 2,
    'promotor_turistico': 3 // Garante que funcione com ambos os nomes
  };

  ngOnInit(): void {
    // Ouve mudanças nos parâmetros da URL para definir a aba inicial
    this.route.queryParams.subscribe(params => {
      const roleParam = params['role'];

      if (roleParam && this.roleTabIndexMap[roleParam] !== undefined) {
        const index = this.roleTabIndexMap[roleParam];

        // Atualiza o sinal visual da aba
        this.activeTabIndex.set(index);

        // Carrega os dados daquela aba
        this.onTabChanged(index);
      } else {
        // Comportamento padrão: carrega a primeira aba
        this.onTabChanged(0);
      }
    });
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

    // Sincroniza o sinal visual caso o clique tenha sido manual
    this.activeTabIndex.set(index);

    const tabType = this.tabTypes[index];
    this.currentRole = tabType;

    this.userService.getUsersByRole(tabType, '').subscribe(users => {
      this.currentItems.set(this.transformUsersToCards(users));
      this.isLoading.set(false);
    });
  }

  navigateToDetails(item: TabsListCard): void {
    this.router.navigate(['/administrador/usuarios/detalhe', item.id]);
  }

  createNewUser(): void {
    this.router.navigate(['/administrador/usuarios/novo', this.currentRole]);
  }

  private transformUsersToCards(users: User[]): TabsListCard[] {
    return users.map(user => ({
      id: user.id,
      title: user.name || user.businessName || 'Sem Nome',
      description: user.email || 'Usuário sem email',
      img: this.getAvatarForRole(user.role),
      category: user.role,
    }));
  }

  private getAvatarForRole(role: UserRole): string {
    switch (role) {
      case 'empreendedor':
        return 'assets/images/png/local-entrepreneur.png';
      case 'promotor_turistico':
        return 'assets/images/png/tourism-promoter.png';
      case 'viajante':
        return 'assets/images/png/commom-user.png';
      case 'administrador':
        return 'assets/images/png/commom-user.png';
      default:
        return 'assets/images/png/commom-user.png';
    }
  }
}