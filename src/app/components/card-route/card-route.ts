import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { IRoute } from "../../interfaces/route";


@Component({
  selector: 'app-card-route',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './card-route.html',
  styleUrl: './card-route.scss'
})
export class CardRoute {
  @Input() item!: IRoute;
}
