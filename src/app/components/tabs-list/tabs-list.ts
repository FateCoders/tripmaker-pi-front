import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsSection } from '../../models/tabs-section/tabs-section';
import { MatListModule, MatList } from '@angular/material/list';
import { ListCard } from '../list-card/list-card';

@Component({
  selector: 'app-tabs-list',
  imports: [MatTabsModule, ListCard, MatList],
  templateUrl: './tabs-list.html',
  styleUrls: ['./tabs-list.scss']
})
export class TabsList {
  @Input() tabs: TabsSection[] = [];
}
