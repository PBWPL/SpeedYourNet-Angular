import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-panel-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  user: User;
  role = 'GUEST';
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router, private authService: AuthService) {
    this.navLinks = [
      {
        label: 'Articles',
        link: '/panel/articles',
        index: 0,
      },
      {
        label: 'Users',
        link: '/panel/users',
        index: 1,
      },
      {
        label: 'Servers',
        link: '/panel/servers',
        index: 2,
      },
      {
        label: 'Results',
        link: '/panel/results',
        index: 3,
      },
    ];
  }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
      if (user) {
        this.role = user.role.name;
      }
    });
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });
  }
}
