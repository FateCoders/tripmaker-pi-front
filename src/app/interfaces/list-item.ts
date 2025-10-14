export interface ListItem {
  id: string;
  img: string;
  isFavorite: boolean;
  title: string;
  priceRange: string;
  distance: string;
  description: string;
  category: 'A' | 'B' | 'C';
}
