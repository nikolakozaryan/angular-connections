import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private httpService: HttpService) {}

  getProfile() {
    return this.httpService.getProfile();
  }

  editProfile(name: string) {
    return this.httpService.editProfile(name);
  }
}
