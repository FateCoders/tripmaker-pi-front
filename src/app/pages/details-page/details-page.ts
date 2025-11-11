import { Component, Input } from '@angular/core';
import { DetailsComponent } from '../details-component/details-component';

@Component({
  selector: 'app-details-page',
  imports: [DetailsComponent],
  templateUrl: './details-page.html',
  styleUrl: './details-page.scss',
})
export class DetailsPage {
  @Input() isEvent: boolean = false;
  @Input() isRoute: boolean = false;
}
