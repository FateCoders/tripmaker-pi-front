export class TabsListItem {
  id: string;
  img: string;
  title: string;
  description: string;

  constructor(id: string, img: string, title: string, description: string) {
    this.id = id;
    this.img = img;
    this.title = title;
    this.description = description;
  }
}
