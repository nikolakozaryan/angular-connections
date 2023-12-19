import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";

@Injectable({
  providedIn: "root",
})
export class MainService {
  constructor(private http: HttpService) {}

  getGroups() {
    return this.http.getGroupsList();
  }

  getPeople() {
    return this.http.getUsers();
  }

  getConverations() {
    return this.http.getConversations();
  }

  deleteGroup(groupID: string) {
    return this.http.deleteGroup(groupID);
  }

  createGroup(groupName: string) {
    return this.http.createGroup(groupName);
  }

  createConversation(companionID: string) {
    return this.http.createConversation(companionID);
  }
}
