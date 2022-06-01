import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  submited = false;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.authService.userValue) {
      this.router.navigate(['/home']);
    }

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.token) {
        this.authService.confirm(params.token).subscribe(
          (data) => {
            this.notificationService.showSuccess(data.message);
          },
          (error) => {
            this.notificationService.showError(error.error.message);
          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.submited = true;
    this.authService
      .login(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      )
      .pipe(first())
      .subscribe({
        next: (response) => {
          const returnUrl =
            this.route.snapshot.queryParams.returnUrl || '/home';
          this.notificationService.showSuccess(response.message);
          this.router.navigateByUrl(returnUrl);
        },
        error: (err) => {
          this.notificationService.showError(err.error.message);
          this.submited = false;
        },
      });
  }
}
