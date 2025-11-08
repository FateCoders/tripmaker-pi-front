export interface Commerce {
  id: string;
  name: string;
  address: string;
  logoUrl: string;
  visitors: string;
  rating: number;
  priceRange?: string;
  hours: string;
  category?: string;
  routesCount: number;
  monthlyVisitors: number;
  location: {
    query: string;
  };
  description: string;
  caracteristicas: string[];
  imagesUrl?: string[];
  region?: string;
  creationDate?: Date | string;
}