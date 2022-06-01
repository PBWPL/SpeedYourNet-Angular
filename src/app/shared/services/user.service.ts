import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private api: ApiService,
    public notificationService: NotificationService
  ) {}

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api.apiUrl}user`);
  }

  public getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.api.apiUrl}user/${id}`);
  }

  public createUser(user): Observable<User> {
    return this.http.post<User>(`${this.api.apiUrl}user`, user);
  }

  public updateUser(
    id: number,
    email: string,
    password: string
  ): Observable<User> {
    return this.http.put<User>(`${this.api.apiUrl}user/${id}`, {
      email,
      password,
    });
  }

  public deleteUser(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.api.apiUrl}user/${id}`);
  }
}
