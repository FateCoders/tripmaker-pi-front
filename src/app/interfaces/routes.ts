export interface Route {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  registeredUsers: string[];
  region: string;
  creationDate: Date | string;
  img?: string;
}