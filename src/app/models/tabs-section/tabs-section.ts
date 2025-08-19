import { TabsListItem } from "../tabs-list-item/tabs-list-item";

export class TabsSection {
  label: string;
  content: TabsListItem[];

  constructor(label: string, content: TabsListItem[]) {
    this.label = label;
    this.content = content;
  }
}
