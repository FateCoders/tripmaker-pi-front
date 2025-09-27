import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { TabsListCard } from '../../models/tabs-list-card';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FilterBar } from '../filter-bar/filter-bar';
import { CardDefault } from '../card-default/card-default';
import { CardFavorite } from "../card-favorite/card-favorite";

@Component({
  selector: 'app-list-view',
  imports: [FormsModule, MatListModule, CardDefault, SearchBarComponent, FilterBar, CardFavorite],
  templateUrl: './list-view.html',
  styleUrls: ['./list-view.scss']
})
export class ListView {
  @Input() items: TabsListCard[] = [];
  @Input() enableSearch: boolean = false;
  @Input() enableFilter: boolean = false;
  @Input() cardType: string = "default";

  searchTerm: string = '';
  selectedCategory: string = '';

  get filteredItems(): TabsListCard[] {
    let result = this.items;

    // 🔍 busca
    if (this.enableSearch && this.searchTerm?.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
      );
    }

    // 🎯 filtro de categoria simples
    if (this.enableFilter && this.selectedCategory) {
      result = result.filter(item => item['category'] === this.selectedCategory);
    }

    return result;
  }

  // 🔽 Novo método que o FilterBar vai chamar
  onCategoryChange(category: string) {
    this.selectedCategory = category;
  }
}
