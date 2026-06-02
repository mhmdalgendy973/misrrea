import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';

const passwordMatchValidator: ValidatorFn =
  (control: AbstractControl): ValidationErrors | null => {

    const password =
      control.get('password')?.value;

    const confirmPassword =
      control.get('password_confirmation')?.value;

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };

  };

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss'
})
export class ChangePassword {
  constructor(private authService: AuthService, private router: Router) { }

  private fb = inject(FormBuilder);

  successMessage = '';
  errorMessage = '';

  changePasswordForm =
    this.fb.nonNullable.group({

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      password_confirmation: [
        '',
        Validators.required
      ]

    },
      {
        validators: passwordMatchValidator
      });

  changePassword() {
    this.changePasswordForm.markAllAsTouched();
    this.successMessage = '';
    this.errorMessage = '';

    if (
      this.changePasswordForm.invalid
    ) {

      return;

    }

    const payload = {

      reset_token:
        localStorage.getItem('reset_token') ?? '',

      ...this.changePasswordForm
        .getRawValue()

    };

    this.authService
      .changePassword(payload)
      .subscribe({
        next: (res: any) => {
          this.successMessage =
            res.message ??
            'Password changed successfully';

          setTimeout(() => {

            this.router.navigate(
              ['/login']
            );

          }, 1500);

        },

        error: (err) => {
          this.errorMessage =
            err.error?.message ??
            'Failed to change password';

        }

      });

  }

}
