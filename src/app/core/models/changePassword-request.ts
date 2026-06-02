export interface ChangePasswordRequest {
  reset_token: string;
  password: string;
  password_confirmation: string;
}
