export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  country_code: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  user_type_id: string;
  account_type_id: string;
  company_name: string;
  company_number: string;
  company_activity: string;
  company_description: string;
  company_profile: string;
  company_address: string;
  company_email: string;
  application_purpose: string;
  password: string;
  password_confirmation: string;
}

export interface VerifyOtpRequest {
  reset_token: string;
  otp: string;
}

export interface ForgetPasswordRequest {
  email: string;
  type: string;
}

export interface ChangePasswordRequest {
  reset_token: string;
  password: string;
  password_confirmation: string;
}
