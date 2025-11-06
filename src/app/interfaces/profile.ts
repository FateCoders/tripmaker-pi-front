export interface Profile {
  type: 'promoter' | 'traveler' | 'entrepreneur';
  title: string;
  description: string;
  imageUrl: string;
  patternUrl: string;
}
