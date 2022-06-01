import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
})
export class RecoveryComponent implements OnInit {
  recoveryForm: FormGroup;

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
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    this.authService.recovery(this.recoveryForm.get('email').value).subscribe(
      (data) => {
        this.notificationService.showSuccess(data.message);
        this.router.navigate(['/users/login']);
      },
      (error) => {
        this.notificationService.showError(error.error.message);
      }
    );
  }
}
