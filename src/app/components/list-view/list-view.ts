import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { ListCard } from '../card-default/card-default';
import { TabsListCard } from '../../models/tabs-list-card';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FilterBar } from '../filter-bar/filter-bar';
import { CardUser } from '../card-user/card-user';

@Component({
  selector: 'app-list-view',
  imports: [CommonModule, FormsModule, MatListModule, ListCard, SearchBarComponent, FilterBar, CardUser],
  templateUrl: './list-view.html',
  styleUrls: ['./list-view.scss']
})
export class ListView {
  @Input() items: TabsListCard[] = [];
  @Input() enableSearch: boolean = false;
  @Input() enableFilter: boolean = false;
  @Input() cardType: string = "default";


  @Output() listChanged = new EventEmitter<void>();

  searchTerm: string = '';
  selectedCategory: string = '';

  get filteredItems(): TabsListCard[] {
    let result = this.items;


    if (this.enableSearch && this.searchTerm?.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
      );
    }


    if (this.enableFilter && this.selectedCategory) {
      result = result.filter(item => item['category'] === this.selectedCategory);
    }

    return result;
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
  }


  handleUserDeleted(userId: string): void {
    console.log('ListView: Recebeu evento de exclusão para', userId);

    this.listChanged.emit();
  }
}