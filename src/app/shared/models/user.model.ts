import { Role } from './role.model';

export class User {
  id: number;
  email: string;
  password?: string;
  token: string;
  active: boolean;
  last_login: Date;
  createdAt: Date;
  updatedAt: Date;
  role?: Role;
}
