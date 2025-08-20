import { Component, Input } from '@angular/core';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-form-input',
  imports: [MatInputModule],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss'
})
export class FormInput {
  @Input() label:string = '';
  @Input() placeholder:string = '';
  @Input() value:string = '';
}
