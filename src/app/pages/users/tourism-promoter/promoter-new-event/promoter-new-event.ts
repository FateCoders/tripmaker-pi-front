import { Component, OnInit, inject, ViewChild, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

// Material Modules
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Components
import { ChipButtonComponent } from '../../../../components/buttons/chip-button/chip-button';
import { SearchBarComponent } from '../../../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-promoter-new-event',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    ChipButtonComponent,
    SearchBarComponent
  ],
  templateUrl: './promoter-new-event.html',
  styleUrl: './promoter-new-event.scss',
})
export class PromoterNewEvent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  @ViewChild('stepper') stepper!: MatStepper;

  // Forms
  step1Location!: FormGroup;
  step2Details!: FormGroup;

  // Map State
  mapUrl = signal<SafeResourceUrl>(this.getSanitizedMapUrl(null));
  isMapExpanded = signal(false);
  private addressSub!: Subscription;

  // Characteristics Data
  caracteristicasControls = [
    { key: 'localAcessivel', label: 'Local Acessível', icon: 'accessible' },
    { key: 'comercio', label: 'Comércio', icon: 'store' },
    { key: 'restaurante', label: 'Restaurante', icon: 'restaurant' },
    { key: 'ambienteNatural', label: 'Ambiente Natural', icon: 'forest' },
    { key: 'hospedaria', label: 'Hospedaria', icon: 'hotel' },
    { key: 'petFriendly', label: 'Pet Friendly', icon: 'pets' },
    { key: 'cultural', label: 'Cultural', icon: 'theater_comedy' },
  ];

  constructor() {
    this.buildForms();
  }

  ngOnInit(): void {
    // Atualiza o mapa quando o endereço muda
    this.addressSub = this.step1Location
      .get('address')!
      .valueChanges.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((address) => {
        this.mapUrl.set(this.getSanitizedMapUrl(address));
      });
  }

  ngOnDestroy(): void {
    this.addressSub?.unsubscribe();
  }

  private buildForms(): void {
    // Passo 1: Localização (Baseado na Imagem 2)
    const caracteristicasGroup = this.caracteristicasControls.reduce((acc, control) => {
      acc[control.key] = [false];
      return acc;
    }, {} as { [key: string]: any });

    this.step1Location = this.fb.group({
      address: ['', Validators.required],
      caracteristicas: this.fb.group(caracteristicasGroup),
    });

    // Passo 2: Detalhes (Baseado na Imagem 1)
    this.step2Details = this.fb.group({
      title: ['', Validators.required],
      isPrivate: [false],
      description: ['', Validators.required],
      images: [null], // Controle para upload
    });
  }

  get caracteristicasFormGroup(): FormGroup {
    return this.step1Location.get('caracteristicas') as FormGroup;
  }

  // --- Map Logic ---
  
  private getSanitizedMapUrl(address: string | null): SafeResourceUrl {
    let url: string;
    if (address && address.trim() !== '') {
      const encodedAddress = encodeURIComponent(address);
      url = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    } else {
      url = `https://maps.google.com/maps?q=Brasil&t=&z=4&ie=UTF8&iwloc=&output=embed`; // Posição default
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  toggleMapExpansion(): void {
    this.isMapExpanded.update(val => !val);
  }

  onMapSearch(term: string): void {
    this.step1Location.patchValue({ address: term });
  }

  // --- File Upload Logic ---

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const fileNames = Array.from(input.files).map((f) => f.name);
      this.step2Details.patchValue({ images: fileNames });
    }
  }

  // --- Navigation ---

  goBack(): void {
    this.router.navigate(['/promotor_turistico/inicio']);
  }

  onSubmit(): void {
    if (this.step1Location.invalid || this.step2Details.invalid) {
      this.step1Location.markAllAsTouched();
      this.step2Details.markAllAsTouched();
      return;
    }

    console.log('Evento Criado:', {
      location: this.step1Location.value,
      details: this.step2Details.value
    });

    // Simular sucesso e voltar
    this.router.navigate(['/promotor_turistico/inicio']);
  }
}