import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs/internal/Observable';
import { Article } from '../models/article.model';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(
    private http: HttpClient,
    private api: ApiService,
    public notificationService: NotificationService
  ) {}

  public getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.api.apiUrl}article`);
  }

  public getById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.api.apiUrl}article/${id}`);
  }

  public createArticle(article): Observable<Article> {
    return this.http.post<Article>(`${this.api.apiUrl}article`, article);
  }

  public updateArticle(id: number, article): Observable<Article> {
    return this.http.put<Article>(`${this.api.apiUrl}article/${id}`, article);
  }

  public deleteArticle(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.api.apiUrl}article/${id}`);
  }
}
