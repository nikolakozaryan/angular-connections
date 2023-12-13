import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SigninDto, SigninSuccessResponse } from "@auth/models/dto/login.dto";
import SignupDto from "@auth/models/dto/signup.dto";
import { Observable } from "rxjs";
import { GetProfileRawDTO } from "src/app/profile/core/interfaces/get-profile.dto";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public signup(formData: SignupDto) {
    return this.http.post("registration", formData);
  }

  public signin(formData: SigninDto): Observable<SigninSuccessResponse> {
    return this.http.post<SigninSuccessResponse>("login", formData);
  }

  public logout(): Observable<any> {
    return this.http.delete("logout");
  }

  public getProfile() {
    return this.http.get<GetProfileRawDTO>("profile");
  }

  public editProfile(name: string) {
    return this.http.put("profile", { name });
  }
}
