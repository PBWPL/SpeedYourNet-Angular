import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hide = true;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    if (this.authService.userValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        passwordOne: ['', [Validators.required, Validators.minLength(5)]],
        passwordTwo: ['', [Validators.required, Validators.minLength(5)]],
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(formGroup: FormGroup): any {
    return formGroup.get('passwordOne').value ===
      formGroup.get('passwordTwo').value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    this.authService
      .register(
        this.registerForm.get('email').value,
        this.registerForm.get('passwordTwo').value
      )
      .subscribe(
        (data) => {
          this.notificationService.showSuccess(data.message);
        },
        (error) => {
          this.notificationService.showError(error.error.message);
        },
        () => {
          this.router.navigate(['/user/login']);
        }
      );
  }
}
