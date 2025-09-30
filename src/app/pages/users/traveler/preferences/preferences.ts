import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChipButtonComponent } from '../../../../components/buttons/chip-button/chip-button';

interface PreferenceOption {
  label: string;
  selected: boolean;
}

interface PreferenceGroup {
  emoji: string;
  title: string;
  options: PreferenceOption[];
}

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ChipButtonComponent,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './preferences.html',
  styleUrls: ['./preferences.scss'],
})
export class PreferencesComponent {
  constructor(public dialogRef: MatDialogRef<PreferencesComponent>) {}

  preferenceGroups: PreferenceGroup[] = [
    {
      emoji: '🔥',
      title: 'Estilo de Vida / Personalidade',
      options: [
        { label: 'Aventureiro', selected: true },
        { label: 'Romântico', selected: false },
        { label: 'Caseiro', selected: false },
        { label: 'Boêmio', selected: false },
        { label: 'Minimalista', selected: false },
        { label: 'Realista', selected: false },
        { label: 'Sonhador', selected: true },
        { label: 'Protetor', selected: false },
        { label: 'Espiritualizado', selected: false },
        { label: 'Reservado', selected: false },
        { label: 'Independente', selected: false },
        { label: 'Extrovertido', selected: false },
        { label: 'Introvertido', selected: true },
      ],
    },
    {
      emoji: '🎯',
      title: 'Interesses e Hobbies',
      options: [
        { label: 'Amante da natureza', selected: true },
        { label: 'Apaixonado por viagens', selected: false },
        { label: 'Viciado em séries', selected: false },
        { label: 'Cinéfilo', selected: false },
        { label: 'Gamer', selected: false },
        { label: 'Leitor voraz', selected: false },
        { label: 'Cozinheiro de coração', selected: true },
        { label: 'Marombeiro', selected: false },
        { label: 'Geek / Nerd', selected: false },
        { label: 'Amante da música', selected: false },
        { label: 'Dançarino nas horas vagas', selected: false },
        { label: 'Esportista', selected: false },
        { label: 'Artista criativo', selected: true },
      ],
    },
  ];

  onConfirm(): void {
    const selectedPreferences = this.preferenceGroups.flatMap((group) =>
      group.options.filter((option) => option.selected).map((option) => option.label)
    );

    this.dialogRef.close(selectedPreferences);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
