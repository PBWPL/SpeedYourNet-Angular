import { User } from './user.model';
import { Server } from './server.model';

export class Result {
  id: number;
  user_id: number;
  server_id: string;
  ping: number;
  download: number;
  upload: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  server?: Server;
}
