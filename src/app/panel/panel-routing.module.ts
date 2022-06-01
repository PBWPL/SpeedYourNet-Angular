import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ServerListComponent } from './servers/list/server-list.component';
import { UserListComponent } from './users/list/user-list.component';
import { ArticleListComponent } from './articles/list/article-list.component';
import { ResultListComponent } from './results/list/result-list.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';

const PanelRoutes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: 'servers',
    component: ServerListComponent,
    canActivate: [AuthGuardService],
    data: {
      permission: {
        only: ['ADMIN'],
        redirectTo: 'login',
      },
    },
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuardService],
    data: {
      permission: {
        only: ['ADMIN'],
        redirectTo: 'login',
      },
    },
  },
  {
    path: 'articles',
    component: ArticleListComponent,
    canActivate: [AuthGuardService],
    data: {
      permission: {
        only: ['BLOGGER', 'ADMIN'],
        redirectTo: 'login',
      },
    },
  },
  {
    path: 'results',
    component: ResultListComponent,
    canActivate: [AuthGuardService],
    data: {
      permission: {
        only: ['ADMIN'],
        redirectTo: 'login',
      },
    },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(PanelRoutes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {}
