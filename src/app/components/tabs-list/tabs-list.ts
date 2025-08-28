import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsSection } from '../../models/tabs-section';

@Component({
  selector: 'app-tabs-list',
  imports: [MatTabsModule],
  templateUrl: './tabs-list.html',
  styleUrls: ['./tabs-list.scss']
})
export class TabsList {
  @Input() tabs: TabsSection[] = [];
  @Output() tabChanged = new EventEmitter<number>();

  onTabChange(index: number) {
    this.tabChanged.emit(index);
  }
}
