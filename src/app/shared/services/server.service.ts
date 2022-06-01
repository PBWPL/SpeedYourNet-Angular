import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs/internal/Observable';
import { Server } from '../models/server.model';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private notificationService: NotificationService
  ) {}

  public getAll(): Observable<Server[]> {
    return this.http.get<Server[]>(`${this.api.apiUrl}server`);
  }

  public getById(id: number): Observable<Server> {
    return this.http.get<Server>(`${this.api.apiUrl}server/${id}`);
  }

  public createServer(server: Server): Observable<Server> {
    return this.http.post<Server>(`${this.api.apiUrl}server`, server);
  }

  public updateServer(id: number, server: Server): Observable<Server> {
    return this.http.put<Server>(`${this.api.apiUrl}server/${id}`, server);
  }

  public deleteServer(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.api.apiUrl}server/${id}`);
  }
}
