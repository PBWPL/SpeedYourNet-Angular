import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { NotificationService } from './notification.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
  private readonly _apiUrl: string;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
    this._apiUrl = environment.apiUrl + '/';
    this._apiUrlServer = environment.apiUrlServer;
  }

  private _apiUrlServer: string;

  get apiUrlServer(): string {
    return this._apiUrlServer;
  }

  set apiUrlServer(ip: string) {
    this._apiUrlServer = `https://${ip}`;
  }

  get apiUrl(): string {
    return this._apiUrl;
  }

  get timestamp(): number {
    return new Date().getTime();
  }

  public ip(): Observable<object> {
    return this.http.get(this._apiUrl + 'ip');
  }

  public ping(): Observable<object> {
    return this.http.head(`${this.apiUrlServer}?t=${this.timestamp}`);
  }

  public download(size: number): Observable<HttpEvent<object>> {
    const req: HttpRequest<{
      responseType: string;
      reportProgress: boolean;
      observe: string;
    }> = new HttpRequest(
      'GET',
      this.apiUrlServer + `/files/${size}?t=${this.timestamp}`,
      {
        observe: 'events',
        reportProgress: true,
        responseType: 'blob',
      }
    );
    return this.http.request(req);
  }

  public upload(blob: Blob): Observable<HttpEvent<object>> {
    const req: HttpRequest<Blob> = new HttpRequest(
      'POST',
      this.apiUrlServer + `/upload?t=${this.timestamp}`,
      blob,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.http.request(req);
  }
}
