import { Component } from '@angular/core';
import { TabsList } from "../../components/tabs-list/tabs-list";
import { ListView } from "../../components/list-view/list-view";
import { TabsSection } from '../../models/tabs-section';
import { TabsListItem } from '../../models/tabs-list-item';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TabsList, ListView],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  tabs: TabsSection[] = [
    {
      label: 'Fruits',
      content: [
        { id: '1', img: 'https://placehold.co/150', title: 'Apple', description: 'A sweet red fruit', category: 'gostosinho' },
        { id: '2', img: 'https://placehold.co/150', title: 'Banana', description: 'A long yellow fruit', category: 'gostosinha' }
      ]
    },
    {
      label: 'Vegetables',
      content: [
        { id: '3', img: 'https://placehold.co/150', title: 'Carrot', description: 'An orange root vegetable', category: 'gostosinha' },
        { id: '4', img: 'https://placehold.co/150', title: 'Broccoli', description: 'A green cruciferous vegetable', category: 'gostosinho' }
      ]
    }
  ];

  currentItems: TabsListItem[] = this.tabs[0].content;

  onTabChanged(index: number) {
    this.currentItems = this.tabs[index].content;
  }
}
