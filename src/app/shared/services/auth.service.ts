import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Response } from '../models/response.model';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;

  // headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email: string, password: string): Observable<Response> {
    return this.http
      .post<Response>(`${this.api.apiUrl}auth/login`, { email, password })
      .pipe(
        map((response) => {
          localStorage.setItem('user', JSON.stringify(response.user));
          this.userSubject.next(response.user);

          return response;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/user/login']);
  }

  register(email: string, password: string): Observable<Response> {
    return this.http.post<Response>(`${this.api.apiUrl}auth/register`, {
      email,
      password,
    });
  }

  confirm(token: string): Observable<Response> {
    const params = new HttpParams().set('token', token);
    return this.http.get<Response>(`${this.api.apiUrl}auth/confirm`, {
      params,
    });
  }

  recovery(email: string): Observable<Response> {
    return this.http.post<Response>(`${this.api.apiUrl}auth/recovery`, {
      email,
    });
  }
}
