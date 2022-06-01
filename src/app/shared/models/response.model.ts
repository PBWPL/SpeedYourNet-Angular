import { User } from './user.model';
import { Result } from './result.model';
import { Role } from './role.model';
import { Server } from './server.model';
import { Article } from './article.model';

export class Response {
  message?: string;
  success?: string;
  auth?: boolean;
  error?: string;
  user?: User;
  role?: Role;
  server?: Server;
  result?: Result;
  article?: Article;
}
