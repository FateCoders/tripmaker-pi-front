import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Importante para formulários reativos

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field'; // Reativado para modo edição
import { MatInputModule } from '@angular/material/input';         // Reativado para modo edição
import { MatTooltipModule } from '@angular/material/tooltip'; // Para o botão sutil de edição

// Seus componentes e serviços
import { HeaderTitle } from '../../../../components/header-title/header-title';
import { FooterUsercomumComponent } from '../../../../components/public/bottom-menu/bottom-menu.component';
import { ListView } from '../../../../components/list-view/list-view';
import { UserService } from '../../../../services/user.service';
import { CommerceService } from '../../../../services/commerce.service';
import { RoutesService } from '../../../../services/routes.service';
import { User } from '../../../../interfaces/user';
import { TabsListCard } from '../../../../models/tabs-list-card';

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
    MatListModule,
    MatFormFieldModule, // Reativado
    MatInputModule,     // Reativado
    ReactiveFormsModule, // Adicionado
    MatTooltipModule    // Adicionado
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
  private fb = inject(FormBuilder); // Injetar FormBuilder

  user = signal<User | undefined>(undefined);
  isLoading = signal(true);
  isEditing = signal(false); // NOVO: Estado de edição

  relatedItems = signal<TabsListCard[]>([]);
  relatedItemsLabel = signal<string>('Itens Relacionados');

  userForm!: FormGroup; // NOVO: Formulário reativo

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
        this.initForm(u); // Inicializa o formulário com os dados do usuário
      } else {
        this.isLoading.set(false);
      }
    });
  }

  // NOVO: Inicializa o formulário reativo
  initForm(user: User): void {
    this.userForm = this.fb.group({
      name: [user.name || user.businessName || '', Validators.required],
      email: [user.email || '', [Validators.required, Validators.email]],
      phone: [user.phone || ''],
      region: [user.region || ''],
      // Não editamos 'creationDate' ou 'role' por aqui
    });
  }

  loadRelatedData(user: User) {
    if (user.role === 'empreendedor') {
      this.relatedItemsLabel.set('Comércios Cadastrados');
      this.commerceService.getCommercesByOwnerId(user.id).subscribe(commerces => {
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
      const routes = this.routesService.loadCurrentRoute(); // Apenas exemplo mockado
      this.relatedItems.set([
        { id: 'r1', title: 'Fim de semana em Tatuí', description: '4 locais', img: 'assets/images/jpg/teatro.jpeg', category: 'Roteiro' }
      ]);
      this.isLoading.set(false);
    } else if (user.role === 'promotor_turistico') {
      this.relatedItemsLabel.set('Eventos e Rotas Criadas');
      const routes = this.routesService.getAllRoutes(); // Apenas exemplo mockado
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
      'promotor_turistico': 'Promotor Turístico',
      'promotor': 'Promotor Turístico'
    };
    return roles[role] || role;
  }

  goBack() {
    this.location.back();
  }

  // NOVO: Alterna o modo de edição
  toggleEditMode(): void {
    if (this.user()) { // Só entra em modo edição se houver usuário
      this.isEditing.set(!this.isEditing());
      if (this.isEditing()) {
        this.initForm(this.user()!); // Recarrega o formulário com os dados atuais
      }
    }
  }

  // NOVO: Salva as alterações
  saveChanges(): void {
    if (this.userForm.valid && this.user()) {
      const updatedUserData = {
        ...this.user()!, // Pega os dados atuais do usuário
        name: this.userForm.value.name,
        businessName: this.userForm.value.name, // Atualiza ambos para flexibilidade
        email: this.userForm.value.email,
        phone: this.userForm.value.phone,
        region: this.userForm.value.region,
      };

      // Simula a atualização do usuário no serviço (você precisará implementar o update no UserService)
      this.userService.updateUser(updatedUserData).subscribe({
        next: (success) => {
          if (success) {
            this.user.set(updatedUserData); // Atualiza o signal localmente
            this.isEditing.set(false); // Sai do modo de edição
            // Opcional: mostrar um SnackBar de sucesso
          } else {
            // Opcional: mostrar SnackBar de erro
          }
        },
        error: (err) => {
          console.error('Erro ao salvar usuário:', err);
          // Opcional: mostrar SnackBar de erro
        }
      });
    }
  }

  // DELETAR: O método deleteUser não será mais chamado por aqui
}