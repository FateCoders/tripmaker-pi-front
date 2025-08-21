import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { ListCard } from '../list-card/list-card';
import { TabsListItem } from '../../models/tabs-list-item';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [FormsModule, MatListModule, ListCard, SearchBarComponent],
  templateUrl: './list-view.html',
  styleUrls: ['./list-view.scss']
})
export class ListView {
  @Input() items: TabsListItem[] = [];
  @Input() enableSearch: boolean = false;
  @Input() enableFilter: boolean = false;
  @Input() cardType: string = "default";

  searchTerm: string = '';
  selectedCategory: string = '';

  get filteredItems(): TabsListItem[] {
    let result = this.items;

    // 🔍 search (arrumar alguma alternativa para tornar isso reutilizável)
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
}
