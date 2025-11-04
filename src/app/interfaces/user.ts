export type UserRole = 'administrador' | 'viajante' | 'empreendedor' | 'promotor';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  password?: string;
  businessName?: string;
}