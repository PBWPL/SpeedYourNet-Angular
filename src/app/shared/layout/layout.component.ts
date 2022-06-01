import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from 'ngx-toastr';
import { LoaderInterceptor } from '../interceptors/loader.interceptor';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @HostBinding('class') className = '';
  title = 'Speed Your Net';
  user: User;
  role = 'GUEST';
  isDarkMode = localStorage.getItem('dark-mode') === 'true';

  constructor(
    public loaderService: LoaderInterceptor,
    private overlay: OverlayContainer,
    private authService: AuthService
  ) {
    this.authService.user.subscribe((user) => {
      this.user = user;
      if (user) {
        this.role = user.role.name;
      }
    });
  }

  ngOnInit(): void {
    if (this.isDarkMode) {
      this.className = 'dark-mode';
    }
  }

  changeMode(): void {
    if (this.isDarkMode) {
      localStorage.setItem('dark-mode', String(true));
      this.className = 'dark-mode';
      this.overlay.getContainerElement().classList.add('dark-mode');
    } else {
      localStorage.setItem('dark-mode', String(false));
      this.className = '';
      this.overlay.getContainerElement().classList.remove('dark-mode');
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
