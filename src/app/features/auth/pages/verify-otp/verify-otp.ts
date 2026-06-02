import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.scss',
})
export class VerifyOtp {
  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  private fb = inject(FormBuilder);

  otpForm = this.fb.nonNullable.group({
    otp: ['', [Validators.required, Validators.minLength(4)]],
  });

  verifyOtp() {
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();

      return;
    }

    const payload = {
      reset_token: localStorage.getItem('reset_token') ?? '',

      otp: this.otpForm.getRawValue().otp,
    };

    this.authService.verifyOtp(payload).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'OTP Verified Successfully',
          timer: 2000,
          showConfirmButton: false,
        });

        this.errorMessage = '';
      },

      error: (err) => {
        this.successMessage = '';

        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.error?.message ?? 'Invalid OTP',
          timer: 2000,
          showConfirmButton: false,
        });
      },
    });
  }
}
