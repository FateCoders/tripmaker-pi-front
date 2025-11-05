import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { ListCard } from '../card-default/card-default';
import { TabsListCard } from '../../models/tabs-list-card';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FilterBar } from '../filter-bar/filter-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-view',
  imports: [CommonModule, FormsModule, MatListModule, ListCard, SearchBarComponent, FilterBar], 
  templateUrl: './list-view.html',
  styleUrls: ['./list-view.scss'],
})
export class ListView {
  @Input() items: TabsListCard[] = [];
  @Input() enableSearch: boolean = false;
  @Input() enableFilter: boolean = false;
  @Input() cardType: string = 'default';

  @Output() itemClick = new EventEmitter<TabsListCard>();

  searchTerm: string = '';
  selectedCategory: string = '';

  get filteredItems(): TabsListCard[] {
    let result = this.items;

    if (this.enableSearch && this.searchTerm?.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(term) || item.description.toLowerCase().includes(term)
      );
    }

    if (this.enableFilter && this.selectedCategory) {
      result = result.filter((item) => item['category'] === this.selectedCategory);
    }

    return result;
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
  }

  onItemClicked(item: TabsListCard) {
    this.itemClick.emit(item);
  }
}
