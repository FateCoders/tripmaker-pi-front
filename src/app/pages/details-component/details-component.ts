import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FooterUsercomumComponent } from '../../components/public/bottom-menu/bottom-menu.component';
import { Chip } from '../../components/chip/chip';
import { CardCarouselComponent } from '../../components/card-carousel/card-carousel';
import { RouteCardItem } from '../../interfaces/route-card-item';
import { ImageCarouselComponent } from '../../components/image-carousel/image-carousel';

@Component({
  selector: 'app-details-component',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    FooterUsercomumComponent,
    Chip,
    CardCarouselComponent,
    ImageCarouselComponent,
  ],
  templateUrl: './details-component.html',
  styleUrl: './details-component.scss',
})
export class DetailsComponent implements OnInit {
  @Input() isEvent = false;
  @Input() isRoute = false;
  @Input() showActionButtons = false;

  private location = inject(Location);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  contentId: string | null = null;

  routeDetails = {
    headerImage: 'assets/images/jpg/fundo-landing.jpg',
    title: 'Rota Cultural',
    duration: '3 dias',
    price: 'R$ 450',
    description:
      'Experiência completa pelos principais pontos turísticos, com guias especializados e atividades exclusivas.',
    tags: [
      { label: 'Família', icon: 'family_restroom' },
      { label: 'Cultura', icon: 'museum' },
      { label: 'Gastronomia', icon: 'restaurant' },
    ],
  };

  routePoints: RouteCardItem[] = [
    {
      id: '1',
      title: 'Centro Histórico',
      image: 'assets/images/jpg/centro-historico.jpg',
      details: 'Tour guiado pelas ruas coloniais e museus interativos.',
    },
    {
      id: '2',
      title: 'Mercado Municipal',
      image: 'assets/images/jpg/mercado-municipal.jpg',
      details: 'Degustação de pratos típicos e artesanato local.',
    },
    {
      id: '3',
      title: 'Mirante da Serra',
      image: 'assets/images/jpg/mirante-serra.jpg',
      details: 'Vista panorâmica da cidade com pôr do sol inesquecível.',
    },
  ];

  eventImages = [
    {
      image: 'assets/images/jpg/festa-junina.jpg',
      title: 'Festival de Cultura Popular',
      subtitle: 'Música, dança e gastronomia típica.',
    },
    {
      image: 'assets/images/jpg/show-ao-vivo.jpg',
      title: 'Concerto ao ar livre',
      subtitle: 'Orquestra sinfônica com participação especial.',
    },
    {
      image: 'assets/images/jpg/exposicao-arte.jpg',
      title: 'Mostra de Arte Urbana',
      subtitle: 'Instalações interativas e oficinas criativas.',
    },
  ];

  eventImagesUrls = this.eventImages.map((img) => img.image);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.contentId = params.get('id');
    });

    const secondSegment = this.activatedRoute.snapshot.url[1]?.path ?? '';
    if (secondSegment === 'evento') {
      this.isEvent = true;
      this.isRoute = false;
    } else if (secondSegment === 'rota') {
      this.isRoute = true;
      this.isEvent = false;
    }

    console.log('DetailsComponent initialized');

    console.log('Activated Route Snapshot:', this.activatedRoute.snapshot);

    console.log('Content ID:', this.contentId);
    console.log('isEvent:', this.isEvent);
    console.log('isRoute:', this.isRoute);
  }

  goBack(): void {
    this.location.back();
  }

  saveRoute(): void {
    console.log('Rota salva!');
    this.router.navigate(['/viajante/roteiros/salvar']);
  }

  toggleFavorite(): void {
    console.log('Favorito clicado!');
  }
}
