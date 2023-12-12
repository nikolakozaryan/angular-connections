export interface SigninDto {
  email: string;
  password: string;
}

export interface SigninSuccessResponse {
  token: "string";
  uid: "string";
}
