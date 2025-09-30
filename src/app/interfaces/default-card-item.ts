import { IFigure } from "./figure";

export interface IDefaultCardItem {
  type: 'default';
  id: string;
  image: IFigure;
  isFavorite: boolean;
  title: string;
  priceRange: string;
  distance: string;
  description: string;
  category: 'A' | 'B' | 'C';
}