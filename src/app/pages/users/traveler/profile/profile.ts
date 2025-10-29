import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FooterUsercomumComponent } from "../../../../components/public/bottom-menu/bottom-menu.component";
import { ProfileImg } from "../../../../components/profile-img/profile-img";
import { SearchBarComponent } from "../../../../components/search-bar/search-bar.component";
import { Imagem } from '../../../../interfaces/imagem';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FooterUsercomumComponent,
    ProfileImg,
    SearchBarComponent,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class TravelerProfile {

  // Usando uma imagem de perfil dos seus assets como placeholder
  profileImage: Imagem = {
    url: 'assets/images/png/commom-user.png',
    alt: 'Foto do Perfil do Viajante'
  };

  userName: string = "Nome do usuário"; // Você pode carregar isso de um serviço
  searchTerm: string = "";

  menuItems = [
    {
      icon: 'favorite_border',
      title: 'Favoritos',
      description: 'Todas as rotas, eventos e roteiros.',
      route: '/viajante/favoritos' // Rota de exemplo
    },
    {
      icon: 'verified_user',
      title: 'Permissões',
      description: 'Configurar as permissões de uso.',
      route: '/viajante/permissoes' // Rota para a nova página
    },
    {
      icon: 'description',
      title: 'Termos e Condições',
      description: 'Ler termos e condições para uso.',
      route: '/viajante/termos' // Rota para a nova página
    },
    {
      icon: 'logout', // Ícone de sair
      title: 'Sair',
      description: 'Desconectar-se do aplicativo.',
      route: '/viajante/sair' // Rota para a nova página
    }
  ];
}