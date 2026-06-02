import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_ENDPOINTS } from '../constants/api-endpoints';
import { environment } from '../constants/environment';

import {
  ChangePasswordRequest,
  ForgetPasswordRequest,
  LoginRequest,
  RegisterRequest,
  VerifyOtpRequest
} from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  login(data: LoginRequest) {

    return this.http.post(
      `${this.api}${API_ENDPOINTS.LOGIN}`,
      data
    );

  }

  register(data: RegisterRequest) {

    return this.http.post(
      `${this.api}${API_ENDPOINTS.REGISTER}`,
      data
    );

  }

  verifyOtp(data: VerifyOtpRequest) {

    return this.http.post(
      `${this.api}${API_ENDPOINTS.VERIFY_OTP}`,
      data
    );

  }

  forgetPassword(
    data: ForgetPasswordRequest
  ) {

    return this.http.post(
      `${this.api}${API_ENDPOINTS.FORGET_PASSWORD}`,
      data
    );

  }

  changePassword(
    data: ChangePasswordRequest
  ) {

    return this.http.post(
      `${this.api}${API_ENDPOINTS.CHANGE_PASSWORD}`,
      data
    );

  }

  resendCode(resetToken: string) {

    return this.http.post(
      `${this.api}${API_ENDPOINTS.RESEND_CODE}`,
      {
        reset_token: resetToken
      }
    );

  }

}
