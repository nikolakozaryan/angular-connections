import { Injectable } from '@angular/core';
import { SigninDto, SigninSuccessResponse } from '@auth/models/dto/login.dto';
import SignupDto from '@auth/models/dto/signup.dto';
import { selectIsAuthorized } from '@auth/store/auth.selectors';
import { HttpService } from '@core/services/http.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpService: HttpService, private store: Store) {}

  public signup(formData: SignupDto): Observable<any> {
    return this.httpService.signup(formData);
  }

  public signin(formData: SigninDto): Observable<SigninSuccessResponse> {
    return this.httpService.signin(formData);
  }

  public get isAuthorized(): Observable<boolean> {
    return this.store.select(selectIsAuthorized);
  }
}
