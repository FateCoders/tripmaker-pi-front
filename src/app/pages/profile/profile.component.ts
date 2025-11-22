import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FooterUsercomumComponent } from '../../components/public/bottom-menu/bottom-menu.component';
import { ProfileImg } from '../../components/profile-img/profile-img';

import { Imagem } from '../../interfaces/imagem';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface MenuItem {
  icon: string;
  title: string;
  description: string;
  route?: string;
  action?: () => void;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FooterUsercomumComponent,
    ProfileImg,

    MatListModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class Profile implements OnInit {
  private authService = inject(AuthService);

  profileImage: Imagem = {
    url: 'assets/images/png/commom-user.png',
    alt: 'Foto do Perfil',
  };

  userName: string = 'Usuário';
  userRoleLabel: string = '';

  menuItems: MenuItem[] = [];

  private commonMenuItems = {
    logout: {
      icon: 'logout',
      title: 'Sair',
      description: 'Desconectar-se do aplicativo.',
      action: () => this.logout(),
    },
  };

  private travelerMenuItems: MenuItem[] = [
    {
      icon: 'favorite_border',
      title: 'Favoritos',
      description: 'Todas as rotas, eventos e roteiros.',
      route: '/viajante/favoritos',
    },
    {
      icon: 'verified_user',
      title: 'Permissões',
      description: 'Configurar as permissões de uso.',
      route: '/viajante/permissoes',
    },
    {
      icon: 'description',
      title: 'Termos e Condições',
      description: 'Ler termos e condições para uso.',
      route: '/termos',
    },
    this.commonMenuItems.logout,
  ];

  private entrepreneurMenuItems: MenuItem[] = [
    {
      icon: 'verified_user',
      title: 'Permissões',
      description: 'Configurar as permissões de uso.',
      route: '/empreendedor/permissoes',
    },
    {
      icon: 'description',
      title: 'Termos e Condições',
      description: 'Ler termos e condições para uso.',
      route: '/termos',
    },
    this.commonMenuItems.logout,
  ];

  private promoterMenuItems: MenuItem[] = [
    {
      icon: 'verified_user',
      title: 'Permissões',
      description: 'Configurar as permissões de uso.',
      route: '/promotor_turistico/permissoes',
    },
    {
      icon: 'description',
      title: 'Termos e Condições',
      description: 'Ler termos e condições para uso.',
      route: '/termos',
    },
    this.commonMenuItems.logout,
  ];

  private adminMenuItems: MenuItem[] = [
    {
      icon: 'admin_panel_settings',
      title: 'Permissões',
      description: 'Gerenciar permissões e acessos.',
      route: '/administrador/permissoes',
    },
    {
      icon: 'description',
      title: 'Termos e Condições',
      description: 'Ler termos e condições para uso.',
      route: '/termos',
    },
    this.commonMenuItems.logout,
  ];

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    const role = this.authService.getUserRole();

    if (user) {
      this.userName = user.name || user.businessName || 'Usuário';
    }

    switch (role) {
      case 'viajante':
        this.userRoleLabel = 'Viajante';
        this.menuItems = this.travelerMenuItems;
        break;
      case 'empreendedor':
        this.userRoleLabel = 'Empreendedor Local';
        this.profileImage.url = 'assets/images/png/local-entrepreneur.png';
        this.menuItems = this.entrepreneurMenuItems;
        break;
      case 'promotor_turistico':
        this.userRoleLabel = 'Promotor Turístico';
        this.profileImage.url = 'assets/images/png/tourism-promoter.png';
        this.menuItems = this.promoterMenuItems;
        break;
      case 'administrador':
      case 'admin':
        this.userRoleLabel = 'Administrador';
        this.menuItems = this.adminMenuItems;
        break;
      default:
        this.userRoleLabel = 'Visitante';
        this.menuItems = [this.commonMenuItems.logout];
    }
  }

  logout(): void {
    this.authService.logout();
  }
}