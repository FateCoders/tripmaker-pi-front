import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-text-area-input',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, NgStyle],
  templateUrl: './text-area-input.html',
  styleUrl: './text-area-input.scss',
})
export class TextAreaInput {
  @Input() control: FormControl = new FormControl();

  @Input() label: string = '';
  @Input() placeholder: string = '';

  @Input() width: string = '100%';
  @Input() height: string = 'auto';
  @Input() color: string = '';

  getContainerStyles() {
    return {
      width: this.width,
      height: this.height,
    };
  }
}
