import { CommonModule, NgComponentOutlet } from "@angular/common";
import { Component, OnInit, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { IDefaultCardItem } from "../../interfaces/default-card-item";
import { ListItem } from "../../interfaces/list-item";
import { CardEvent } from "../card-event/card-event";
import { CardRoute } from "../card-route/card-route";
import { FilterBar } from "../filter-bar/filter-bar";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { CardDefault } from "../card-default/card-default";

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatDividerModule,
    NgComponentOutlet,    
    CardDefault, 
    CardEvent,
    CardRoute,
    SearchBarComponent, 
    FilterBar
  ],
  templateUrl: './list-view.html',
  styleUrls: ['./list-view.scss']
})
export class ListView implements OnInit {
  @Input() items: ListItem[] = [];
  @Input() enableSearch: boolean = false;
  @Input() enableFilter: boolean = false;
  // Propriedade cardType removida pois será inferida de cada item

  searchTerm: string = '';
  selectedCategory: string = '';

  // 1. Mapa de Componentes: Associa o valor da propriedade 'type' ao componente
  cardComponentMap = {
    'default': CardDefault,
    'event': CardEvent,
    'route': CardRoute,
  };

  ngOnInit(): void {
    // Garante que todos os itens tenham um discriminador 'type' para segurança.
    this.items = this.items.map(item => {
      if (!('type' in item) && typeof item === 'object' && item !== null) {
        // Assume 'default' se o tipo estiver faltando
        return { ...(item as object), type: 'default' } as unknown as IDefaultCardItem;
      }
      return item;
    }) as ListItem[];
  }

  get filteredItems(): ListItem[] {
    let result = this.items;

    // 🔍 Lógica de busca
    if (this.enableSearch && this.searchTerm?.trim()) {
      const term = this.searchTerm.toLowerCase();
      
      // Filtra por 'title' e 'description' (se existir)
      result = result.filter(item => {
          const itemTitle = (item as { title: string }).title.toLowerCase();
          
          if ('description' in item) {
              const itemDescription = (item as IDefaultCardItem).description.toLowerCase();
              return itemTitle.includes(term) || itemDescription.includes(term);
          }
          return itemTitle.includes(term);
      });
    }

    // 🎯 Lógica de filtro (Atualmente só funciona com a propriedade 'category' do IDefaultCardItem)
    if (this.enableFilter && this.selectedCategory) {
      result = result.filter(item =>
        'type' in item && item.type === 'default' && (item as IDefaultCardItem).category === this.selectedCategory
      );
    }

    return result;
  }

  // 2. Método para obter o componente correto
  getComponent(item: ListItem): any {
    // Obtém o tipo a partir do item ou usa 'default' como fallback
    const componentType = (item as any).type || 'default';
    
    // Busca o componente no mapa. Usa CardDefault como fallback final se o tipo for desconhecido.
    return this.cardComponentMap[componentType as keyof typeof this.cardComponentMap] || CardDefault;
  }

  // 🔽 Método que o FilterBar chama
  onCategoryChange(category: string) {
    this.selectedCategory = category;
  }
}
