// [MODIFICADO] src/app/pages/users/entrepreneur/entrepreneur-new-commerce/entrepreneur-new-commerce.ts

import { Component, OnInit, inject, ViewChild, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

// Imports do Angular Material e NGX-Mask
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';

// Services e Interfaces
import { CommerceService } from '../../../../services/commerce.service';
import { AuthService } from '../../../../services/auth.service';
import { Commerce } from '../../../../interfaces/commerce';
import { ChipButtonComponent } from '../../../../components/buttons/chip-button/chip-button';

@Component({
  selector: 'app-entrepreneur-new-commerce',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatSelectModule,
    MatIconModule,
    NgxMaskDirective,
    ChipButtonComponent,
  ],
  templateUrl: './entrepreneur-new-commerce.html',
  styleUrl: './entrepreneur-new-commerce.scss',
})
export class EntrepreneurNewCommerce implements OnInit, OnDestroy {
  // Injeção de dependências
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private commerceService = inject(CommerceService);
  private authService = inject(AuthService);
  private sanitizer = inject(DomSanitizer);

  // Referência ao Stepper
  @ViewChild('stepper') stepper!: MatStepper;

  // Formulários
  step1Details!: FormGroup;
  step2Location!: FormGroup;
  step3Media!: FormGroup;

  // Dados do usuário
  currentUser: any = null;

  // URL do Mapa
  mapUrl = signal<SafeResourceUrl>(this.getSanitizedMapUrl(null));
  private addressSub!: Subscription;

  caracteristicasControls = [
    { key: 'localAcessivel', label: 'Local Acessível' },
    { key: 'comercio', label: 'Comércio' },
    { key: 'restaurante', label: 'Restaurante' },
    { key: 'ambienteNatural', label: 'Ambiente Natural' },
    { key: 'hospedaria', label: 'Hospedaria' },
    { key: 'petFriendly', label: 'Pet Friendly' },
    { key: 'cultural', label: 'Cultural' },
  ];

  constructor() {
    this.buildForms();
  }

  ngOnInit(): void {
    // Carrega o usuário atual
    this.currentUser = this.authService.getCurrentUser();

    // Monitora o campo de endereço para atualizar o mapa
    this.addressSub = this.step2Location.get('address')!.valueChanges.pipe(
      debounceTime(1000), // Aguarda 1s após o usuário parar de digitar
      distinctUntilChanged()
    ).subscribe(address => {
      this.mapUrl.set(this.getSanitizedMapUrl(address));
    });
  }

  ngOnDestroy(): void {
    // Limpa a subscrição
    this.addressSub?.unsubscribe();
  }

  // Getter para o form group aninhado (corrige erro NG01203)
  get caracteristicasFormGroup(): FormGroup {
    return this.step2Location.get('caracteristicas') as FormGroup;
  }

  private buildForms(): void {
    // Etapa 1: Detalhes
    this.step1Details = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      // CORREÇÃO: Removido Validators.pattern
      horarioAbertura: ['', Validators.required],
      horarioFechamento: ['', Validators.required],
    });

    // Etapa 2: Localização e Características
    const caracteristicasGroup = this.caracteristicasControls.reduce((acc, control) => {
      acc[control.key] = [false];
      return acc;
    }, {} as { [key: string]: any });

    this.step2Location = this.fb.group({
      address: ['', Validators.required],
      caracteristicas: this.fb.group(caracteristicasGroup),
    });

    // Etapa 3: Mídia (Uploads)
    this.step3Media = this.fb.group({
      logotipo: [null],
      imagens: [null],
    });
  }

  // Gera uma URL segura para o Iframe
  private getSanitizedMapUrl(address: string | null): SafeResourceUrl {
    let url: string;
    if (address && address.trim() !== '') {
      const encodedAddress = encodeURIComponent(address);
      // Atualiza a URL para usar o parâmetro 'q' (query) para busca
      url = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    } else {
      // Padrão: Tatuí, SP
      url = `https://maps.google.com/maps?q=Brasil&t=&z=4&ie=UTF8&iwloc=&output=embed`;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // Lógica de "Upload" (mock)
  onFileSelect(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (controlName === 'logotipo') {
        this.step3Media.patchValue({ logotipo: input.files[0].name });
      } else {
        const fileNames = Array.from(input.files).map(f => f.name);
        this.step3Media.patchValue({ imagens: fileNames });
      }
    }
  }

  // Envio final
  onSubmit(): void {
    if (this.step1Details.invalid || this.step2Location.invalid) {
      console.error('Formulário inválido.');
      this.step1Details.markAllAsTouched();
      this.step2Location.markAllAsTouched();
      return;
    }

    const step1 = this.step1Details.value;
    const step2 = this.step2Location.value;
    const step3 = this.step3Media.value;

    const caracteristicasArray = Object.keys(step2.caracteristicas)
      .filter(key => step2.caracteristicas[key])
      .map(key => this.caracteristicasControls.find(c => c.key === key)?.label || key);

    const newCommerce: Commerce = {
      id: `b-${Math.floor(Math.random() * 1000)}`,
      name: step1.name,
      description: step1.description,
      address: step2.address,
      hours: `${step1.horarioAbertura} - ${step1.horarioFechamento}`,
      caracteristicas: caracteristicasArray,
      location: { query: step2.address },
      logoUrl: step3.logotipo ? `assets/images/mocks/${step3.logotipo}` : 'assets/images/png/commom-user.png',
      imagesUrl: step3.imagens || [],
      // Dados mockados restantes
      visitors: '0',
      rating: 0,
      routesCount: 0,
      monthlyVisitors: 0,
    };

    this.commerceService.registerCommerce(newCommerce).subscribe(success => {
      if (success) {
        this.router.navigate(['/empreendedor/comercios']);
      } else {
        console.error('Falha ao cadastrar comércio.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/empreendedor/comercios']);
  }
}