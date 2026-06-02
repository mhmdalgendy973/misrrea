import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss'
})
export class ForgetPassword {

  constructor(private authService: AuthService, private router: Router) { }
  private fb = inject(FormBuilder);
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  forgetForm =
    this.fb.nonNullable.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ]

    });

  sendCode() {

    if (this.forgetForm.invalid) {

      this.forgetForm.markAllAsTouched();

      return;

    }

    const payload = {

      email:
        this.forgetForm.getRawValue().email,

      type: 'email'

    };

    this.authService
      .forgetPassword(payload)
      .subscribe({

        next: (res: any) => {

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Code sent successfully',
            timer: 2000,
            showConfirmButton: false
          });

          this.errorMessage = '';

          this.router.navigate(
            ['/verify-otp']
          );

        },
        error: (err) => {


          Swal.fire({
            icon: 'error',
            title: 'Sending Failed',
            text:
              err.error?.message ??
              'Failed to send code',
            timer: 2000,
            showConfirmButton: false
          });
        }

      });

  }



}
