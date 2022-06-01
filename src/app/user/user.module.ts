import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';
import { PartialLogoComponent } from './shared/partial-logo/partial-logo.component';

@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    RecoveryComponent,
    RegisterComponent,
    PartialLogoComponent,
  ],
  imports: [UserRoutingModule, SharedModule],
  providers: [],
})
export class UserModule {}
