import { Component } from '@angular/core';
import { TabsList } from "../../components/tabs-list/tabs-list";
import { TabsSection } from '../../models/tabs-section/tabs-section';

@Component({
  selector: 'app-home',
  imports: [TabsList],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  tabs: TabsSection[] = [
    {
      label: 'Fruits',
      content: [
        {
          id: '1',
          img: 'https://via.placeholder.com/150',
          title: 'Apple',
          description: 'A sweet red fruit'
        },
        {
          id: '2',
          img: 'https://via.placeholder.com/150',
          title: 'Banana',
          description: 'A long yellow fruit'
        }
      ]
    },
    {
      label: 'Vegetables',
      content: [
        {
          id: '3',
          img: 'https://via.placeholder.com/150',
          title: 'Carrot',
          description: 'An orange root vegetable'
        },
        {
          id: '4',
          img: 'https://via.placeholder.com/150',
          title: 'Broccoli',
          description: 'A green cruciferous vegetable'
        }
      ]
    }
  ];

}
