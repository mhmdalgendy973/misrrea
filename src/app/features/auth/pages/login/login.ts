import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  constructor(private authService: AuthService,) { }
  successMessage = '';
  errorMessage = '';
  private fb = inject(FormBuilder);


  isLoading = false;

  loginForm = this.fb.nonNullable.group({

    email: [
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
    ]

  });

  login() {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();
      return;

    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService
      .login(this.loginForm.getRawValue())
      .subscribe({

        next: (res: any) => {
          this.isLoading = false;
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Login Successful',
            timer: 2000,
            showConfirmButton: false
          });
        },
        error: (err) => {

          this.isLoading = false;

          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text:
              err.error?.message ??
              'Login Failed'
          });

        }

      });

  }

}
