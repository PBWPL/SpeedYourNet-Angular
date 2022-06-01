import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NotificationService } from './notification.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    public notificationService: NotificationService,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true | UrlTree {
    const user = this.authService.userValue;
    if (!user) {
      this.notificationService.showWarning('You must be logged in!');
      this.router.navigate(['/user/login'], {
        queryParams: { returnUrl: state.url },
      });
    }

    const userRole = user.role.name;
    const permission = route.data.permission;

    if (!permission) {
      throw new Error('Permissions is not setup!');
    }

    if (!permission.only.length) {
      throw new Error('Roles are not setup!');
    }

    const access = permission.only.includes(userRole);

    if (!access) {
      this.notificationService.showWarning('You don`t have permissions!');
      this.router.navigate([permission.redirectTo]);
    }

    return access;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
