import { Component, inject, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { IRoute } from "../../interfaces/route";
import { Router } from "@angular/router";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";


@Component({
  selector: 'app-card-route',
  imports: [MatCardModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './card-route.html',
  styleUrl: './card-route.scss'
})
export class CardRoute {
  @Input() item!: IRoute;
  private router = inject(Router);

  navigateToRouteDetail(): void {
    if (this.item && this.item.id) {
      this.router.navigate(['/viajante/rota', this.item.id]);
    }
  }
}
