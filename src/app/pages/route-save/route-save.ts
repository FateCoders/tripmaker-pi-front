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

  routeForm!: FormGroup;

  estimatedTime: string = 'Aprox. 6h 30m';
  estimatedPrice: string = '$$ - $$$';

  coverImage: string = 'assets/images/jpg/teatro.jpeg';

  ngOnInit(): void {
    this.routeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
    });
  }

  goBack(): void {
    this.router.navigate(['/viajante/roteiros/resumo']);
  }

  onSaveRoute(): void {
    if (this.routeForm.invalid) {
      this.routeForm.markAllAsTouched();
      return;
    }

    console.log('Roteiro confirmado:', this.routeForm.value);
    this.router.navigate(['/viajante/roteiros']);
  }
}
