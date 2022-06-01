import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User;
  profileForm: FormGroup;
  hide = true;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    public notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.userValue;
    this.profileForm = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(): void {
    this.userService
      .updateUser(
        this.user.id,
        this.profileForm.get('email').value,
        this.profileForm.get('password').value
      )
      .subscribe(
        (res) => {
          this.authService.userValue.email = res.email;
          localStorage.setItem(
            'user',
            JSON.stringify(this.authService.userValue)
          );
          this.user.email = res.email;
          this.notificationService.showSuccess('User updated');
        },
        () => {
          this.notificationService.showError('Something wrong!');
        }
      );
  }
}
