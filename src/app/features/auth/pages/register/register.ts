import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
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
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  constructor(private authService: AuthService, private router: Router) { }

  private fb = inject(FormBuilder);


  successMessage = '';
  errorMessage = '';

  registerForm =
    this.fb.nonNullable.group({

      country_code: ['+20'],

      first_name: [
        '',
        Validators.required
      ],

      last_name: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      mobile_number: [
        '',
        Validators.required
      ],

      user_type_id: ['2'],

      account_type_id: ['1'],

      company_name: [
        '',
        Validators.required
      ],

      company_number: [
        '',
        Validators.required
      ],

      company_activity: [
        '',
        Validators.required
      ],

      company_description: [
        '',
        Validators.required
      ],

      company_profile: [
        '',
        Validators.required
      ],

      company_address: [
        '',
        Validators.required
      ],

      application_purpose: [
        '',
        Validators.required
      ],

      company_email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

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

  register() {

    this.registerForm.markAllAsTouched();

    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {

      return;

    }

    this.authService
      .register(
        this.registerForm.getRawValue()
      )
      .subscribe({

        next: (res: any) => {

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Registration Successful',
            timer: 2000,
            showConfirmButton: false
          });
          localStorage.setItem(
            'reset_token',
            res.data.reset_token
          );

          setTimeout(() => {

            this.router.navigate(
              ['/verify-otp']
            );

          }, 1500);

        },

        error: (err) => {

          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text:
              err.error?.message ??
              'Registration Failed'
          });

        }

      });

  }

}
