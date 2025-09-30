import { ICategoryBadge } from "./category-badge"
import { IFigure } from "./figure"
import { ILocation } from "./location"

export interface IEvent {
    type: 'event';
    description: string,
    id: string;
    title: string;
    categories: ICategoryBadge[];
    image: IFigure;
    price: number;
    date: Date;
    location: ILocation;
    starts_at: Date;
    ends_at: Date;
  }