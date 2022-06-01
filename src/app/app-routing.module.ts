import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'panel',
    loadChildren: () =>
      import('./panel/panel.module').then((m) => m.PanelModule),
    canActivate: [AuthGuardService],
    data: {
      permission: {
        only: ['BLOGGER', 'ADMIN'],
        redirectTo: 'login',
      },
    },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy:
        PreloadAllModules /*useHash: true, enableTracing: true */,
    }),
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
})
export class AppRoutingModule {}
