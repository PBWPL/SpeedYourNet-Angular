import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Event as RouterEvent,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptor {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
