import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SigninDto, SigninSuccessResponse } from '@auth/models/dto/login.dto';
import SignupDto from '@auth/models/dto/signup.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public signup(formData: SignupDto) {
    return this.http.post('registration', formData);
  }

  public signin(formData: SigninDto): Observable<SigninSuccessResponse> {
    return this.http.post<SigninSuccessResponse>('login', formData);
  }
}
