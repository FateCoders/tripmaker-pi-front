import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { HeaderTitle } from '../../components/header-title/header-title';
import { RoutesService } from '../../services/routes.service'; // Importado

@Component({
  selector: 'app-route-save',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    HeaderTitle,
  ],
  templateUrl: './route-save.html',
  styleUrls: ['./route-save.scss'],
})
export class RouteSaveComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private routesService = inject(RoutesService); // Injetado

  routeForm!: FormGroup;
  currentRouteItems: any[] = [];

  // Dados mockados
  estimatedTime: string = 'Aprox. 6h 30m';
  estimatedPrice: string = '$$ - $$$';
  coverImage: string = 'assets/images/jpg/teatro.jpeg';

  ngOnInit(): void {
    this.routeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
    });
    
    // Carrega os itens do roteiro que foram salvos temporariamente
    this.currentRouteItems = this.routesService.loadCurrentRoute();
    
    // Atualiza o tempo estimado com base no número de itens (apenas mock)
    if (this.currentRouteItems.length > 0) {
        this.estimatedTime = `Aprox. ${this.currentRouteItems.length} paradas`;
        this.coverImage = this.currentRouteItems[0].image || this.coverImage;
    }
  }

  goBack(): void {
    this.router.navigate(['/viajante/roteiros/resumo']);
  }

  onSaveRoute(): void {
    if (this.routeForm.invalid) {
      this.routeForm.markAllAsTouched();
      return;
    }

    if (this.currentRouteItems.length === 0) {
        console.warn('Não foi possível salvar: roteiro vazio.');
        this.router.navigate(['/viajante/roteiros']);
        return;
    }

    // Ação: Salva o roteiro final no Service (que usa localStorage)
    const success = this.routesService.saveFinalRoute(this.routeForm.value, this.currentRouteItems);

    if (success) {
        console.log('Roteiro salvo com sucesso!');
        this.router.navigate(['/viajante/roteiros']);
    } else {
        console.error('Falha ao salvar o roteiro.');
    }
  }
}
