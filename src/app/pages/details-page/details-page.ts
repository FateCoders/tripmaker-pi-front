import { Component, Input } from '@angular/core';
import { RoutesDetailsComponents } from "../routes-details/routes-details";

@Component({
  selector: 'app-details-page',
  imports: [RoutesDetailsComponents],
  templateUrl: './details-page.html',
  styleUrl: './details-page.scss'
})
export class DetailsPage {
  @Input() isEvent:boolean = false;
  @Input() isRoute:boolean = false;
}
