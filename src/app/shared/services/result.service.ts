import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs/internal/Observable';
import { Result } from '../models/result.model';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor(
    private http: HttpClient,
    private api: ApiService,
    public notificationService: NotificationService
  ) {}

  public getAll(): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.api.apiUrl}result`);
  }

  public getById(id: number): Observable<Result> {
    return this.http.get<Result>(`${this.api.apiUrl}result/${id}`);
  }

  public createResult(result: object): Observable<Result> {
    return this.http.post<Result>(`${this.api.apiUrl}result`, result);
  }

  public updateResult(id: number, result): Observable<Result> {
    return this.http.post<Result>(`${this.api.apiUrl}result/${id}`, result);
  }

  public deleteResult(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.api.apiUrl}result/${id}`);
  }
}
