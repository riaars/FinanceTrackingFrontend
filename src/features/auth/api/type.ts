export type LoginRequest = { email: string; password: string };
export type User = { id: string; email: string; username?: string };
export type SignUpRequest = {
  username: string;
  email: string;
  password: string;
  repassword: string;
};
export type SignUpResponse = {
  message: string;
};
