import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-filter',
  imports: [CommonModule, FormsModule, MatSelectModule, MatIconModule],
  templateUrl: './filter.html',
  styleUrl: './filter.scss'
})
export class Filter {
  selectedCategory: string = '';
  categories = [
    { value: '', viewValue: 'Todas' },
    { value: 'tatui', viewValue: 'Apenas em Tatuí-SP' },
    { value: 'outra', viewValue: 'Outra categoria' }
  ];
}
