import { Routes } from '@angular/router';

export const routes: Routes = [
  {
   path: '',
   redirectTo: 'login',
   pathMatch: 'full'
 },

 {
   path: 'login',
   loadComponent: () =>
     import('./features/auth/pages/login/login')
     .then(c => c.Login)
 },

 {
   path: 'register',
   loadComponent: () =>
     import('./features/auth/pages/register/register')
     .then(c => c.Register)
 },

 {
   path: 'verify-otp',
   loadComponent: () =>
     import('./features/auth/pages/verify-otp/verify-otp')
     .then(c => c.VerifyOtp)
 },

 {
   path: 'forget-password',
   loadComponent: () =>
     import('./features/auth/pages/forget-password/forget-password')
     .then(c => c.ForgetPassword)
 },

 {
   path: 'change-password',
   loadComponent: () =>
     import('./features/auth/pages/change-password/change-password')
     .then(c => c.ChangePassword)
 }
];
