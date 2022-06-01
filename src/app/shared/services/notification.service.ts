import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  options: Partial<IndividualConfig> = {
    positionClass: 'toast-top-right',
    progressBar: true,
  };

  constructor(private toastr: ToastrService) {}

  showSuccess(message, title = 'Success'): void {
    this.toastr.success(message, title, this.options);
  }

  showError(message, title = 'Error'): void {
    this.toastr.error(message, title, this.options);
  }

  showInfo(message, title = 'Info'): void {
    this.toastr.info(message, title, this.options);
  }

  showWarning(message, title = 'Warning'): void {
    this.toastr.warning(message, title, this.options);
  }
}
