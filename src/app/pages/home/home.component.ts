import { Component } from '@angular/core';
import { FooterUsercomumComponent } from "../../components/public/footer-usercomum/footer-usercomum.component";
import { ChipButtonComponent } from "../../components/buttons/chip-button/chip-button";
import { TabsList } from "../../components/tabs-list/tabs-list";
import { TabsSection } from '../../models/tabs-section';
import { TabsListCard } from '../../models/tabs-list-card';
import { ListView } from "../../components/list-view/list-view";
import { CardFavorite } from "../../components/card-favorite/card-favorite";
import { CardDefault } from "../../components/card-default/card-default";
import { CardRecommended } from "../../components/card-recommended/card-recommended";

@Component({
  selector: 'app-home',
  imports: [FooterUsercomumComponent, ChipButtonComponent, TabsList, ListView, CardFavorite, CardDefault, CardRecommended],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  tabs: TabsSection[] = [
    {
      label: 'Fruits',
      content: [
        { id: '1', img: 'https://placehold.co/150', title: 'Apple', description: 'A sweet red fruit', category: 'A' },
        { id: '2', img: 'https://placehold.co/150', title: 'Banana', description: 'A long yellow fruit', category: 'B' }
      ]
    },
    {
      label: 'Vegetables',
      content: [
        { id: '3', img: 'https://placehold.co/150', title: 'Carrot', description: 'An orange root vegetable', category: 'A' },
        { id: '4', img: 'https://placehold.co/150', title: 'Broccoli', description: 'A green cruciferous vegetable', category: 'C' }
      ]
    }
  ];

  currentItems: TabsListCard[] = this.tabs[0].content;

  onTabChanged(index: number) {
    this.currentItems = this.tabs[index].content;
  }
}
