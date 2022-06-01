import { User } from './user.model';

export class Article {
  id: number;
  user_id: number;
  title: string;
  image: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}
