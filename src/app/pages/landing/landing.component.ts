import { Component } from '@angular/core';
import { RoundButton } from "../../components/buttons/round-button/round-button";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [RoundButton, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
