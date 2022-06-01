import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
  HammerGestureConfig,
} from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { ApiService } from './shared/services/api.service';
import { AuthService } from './shared/services/auth.service';
import { CoreModule } from './shared/core.module';
import { LayoutModule } from './shared/layout/layout.module';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    pan: {
      direction: 31,
    },
    pinch: {
      enable: false,
    },
    rotate: {
      enable: false,
    },
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot({ maxOpened: 2, autoDismiss: true }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately',
    }),
    LayoutModule,
  ],
  providers: [
    AuthGuardService,
    ApiService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
