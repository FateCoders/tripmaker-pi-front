import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { ListCard } from '../list-card/list-card';
import { TabsListItem } from '../../models/tabs-list-item';

@Component({
  selector: 'app-list-view',
  imports: [FormsModule, MatListModule, ListCard],
  templateUrl: './list-view.html',
  styleUrls: ['./list-view.scss']
})
export class ListView {
  @Input() items: TabsListItem[] = [];

  // habilitar/desabilitar opções vindas da home
  @Input() enableSearch: boolean = false;
  @Input() enableFilter: boolean = false;
  
  @Input() cardType: string = "";
  // fazer variações de cards

  searchTerm: string = '';
  selectedCategory: string = '';

  get filteredItems(): TabsListItem[] {
    let result = this.items;

    // 🔍 search
    if (this.enableSearch && this.searchTerm?.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
      );
    }

    // 🎯 filtro de categoria simples (exemplo)
    if (this.enableFilter && this.selectedCategory) {
      result = result.filter(item => item['category'] === this.selectedCategory);
    }

    return result;
  }
}
