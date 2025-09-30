import { Component, Input } from '@angular/core';
import { Imagem } from '../../interfaces/imagem';

@Component({
  selector: 'app-profile-img',
  imports: [],
  templateUrl: './profile-img.html',
  styleUrl: './profile-img.scss'
})
export class ProfileImg {
@Input() imagem!: Imagem 
}
