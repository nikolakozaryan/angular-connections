export interface ApiErrorResponse {
  errorType: string;
}

export interface AuthSuccess {
  token: string;
  uid: string;
}

export interface AuthData extends AuthSuccess {
  email: string;
}
