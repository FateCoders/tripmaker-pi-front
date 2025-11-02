import { Component, inject } from '@angular/core'; // inject adicionado
import { CommonModule, Location } from '@angular/common'; // Location importado
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms'; // Necessário para o [(ngModel)]

// Modelo para os itens de permissão
interface PermissionItem {
  icon: string;
  title: string;
  description: string;
  model: boolean; // O valor do toggle (true/false)
}

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Importado
    MatListModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  templateUrl: './permissions.html',
  styleUrl: './permissions.scss'
})
export class TravelerPermissions {
  
  // Injeção de dependência moderna
  private router = inject(Router);
  private location = inject(Location); // Location injetado

  // Dados dos itens de permissão baseados no Figma
  permissionItems: PermissionItem[] = [
    {
      icon: 'location_on',
      title: 'Localização',
      description: 'Localização em tempo real para registro de eventos e rotas.',
      model: true
    },
    {
      icon: 'camera_alt',
      title: 'Câmera',
      description: 'Apenas quando solicitado para leitura de QR codes de eventos.',
      model: true
    },
    {
      icon: 'mic',
      title: 'Acesso ao microfone',
      description: 'Necessário para gravar áudios ou participar de chamadas.',
      model: true
    },
    {
      icon: 'history',
      title: 'Histórico de uso',
      description: 'Armazena dados para análise e melhoria da experiência.',
      model: false // Exemplo de um desabilitado
    }
  ];


  navigateBack(): void {
    this.location.back();
  }

  onToggleChange(item: PermissionItem): void {
    console.log(`Permissão '${item.title}' alterada para: ${item.model}`);
  }
}