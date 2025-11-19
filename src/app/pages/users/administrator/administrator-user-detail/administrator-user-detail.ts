import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';

import { HeaderTitle } from '../../../../components/header-title/header-title';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { ListView } from '../../../../components/list-view/list-view';
import { UserService } from '../../../../services/user.service';
import { CommerceService } from '../../../../services/commerce.service';
import { RoutesService } from '../../../../services/routes.service';
import { User } from '../../../../interfaces/user';
import { TabsListCard } from '../../../../models/tabs-list-card';
import { MatListModule } from "@angular/material/list";

@Component({
  selector: 'app-administrator-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    HeaderTitle,
    FooterUsercomumComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatChipsModule,
    ListView,
    MatListModule
  ],
  templateUrl: './administrator-user-detail.html',
  styleUrls: ['./administrator-user-detail.scss']
})
export class AdministratorUserDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private userService = inject(UserService);
  private commerceService = inject(CommerceService);
  private routesService = inject(RoutesService);

  user = signal<User | undefined>(undefined);
  isLoading = signal(true);

  relatedItems = signal<TabsListCard[]>([]);
  relatedItemsLabel = signal<string>('Itens Relacionados');

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUser(userId);
    } else {
      this.goBack();
    }
  }

  loadUser(id: string) {
    this.userService.getUserById(id).subscribe(u => {
      if (u) {
        this.user.set(u);
        this.loadRelatedData(u);
      } else {
        // Tratar usuário não encontrado
        this.isLoading.set(false);
      }
    });
  }

  loadRelatedData(user: User) {
    if (user.role === 'empreendedor') {
      this.relatedItemsLabel.set('Comércios Cadastrados');
      this.commerceService.getAllCommercesForUser().subscribe(commerces => {
        const cards = commerces.map(c => ({
          id: c.id,
          title: c.name,
          description: c.address,
          img: c.logoUrl,
          category: c.category || 'Comércio'
        }));
        this.relatedItems.set(cards);
        this.isLoading.set(false);
      });

    } else if (user.role === 'viajante') {
      this.relatedItemsLabel.set('Roteiros Salvos');
      const routes = this.routesService.loadCurrentRoute();
      this.relatedItems.set([
        { id: 'r1', title: 'Fim de semana em Tatuí', description: '4 locais', img: 'assets/images/jpg/teatro.jpeg', category: 'Roteiro' }
      ]);
      this.isLoading.set(false);

    } else if (user.role === 'promotor_turistico') {
      this.relatedItemsLabel.set('Eventos e Rotas Criadas');
      const routes = this.routesService.getAllRoutes();
      const cards = routes.map(r => ({
        id: r.id,
        title: r.title,
        description: r.description,
        img: r.img || 'assets/images/png/pattern-1.png',
        category: 'Rota'
      }));
      this.relatedItems.set(cards);
      this.isLoading.set(false);
    } else {
      this.isLoading.set(false);
    }
  }

  getRoleLabel(role: string): string {
    const roles: { [key: string]: string } = {
      'administrador': 'Administrador',
      'viajante': 'Viajante',
      'empreendedor': 'Empreendedor',
      'promotor_turistico': 'Promotor_turistico',
      'promotor': 'Promotor Turístico'
    };
    return roles[role] || role;
  }

  goBack() {
    this.location.back();
  }

  editUser() {
    console.log('Implementar edição de cadastro completo se necessário');
  }

  deleteUser() {
    console.log('Solicitar exclusão');
  }
}