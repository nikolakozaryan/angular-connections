import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SigninDto, SigninSuccessResponse } from "@auth/models/dto/login.dto";
import SignupDto from "@auth/models/dto/signup.dto";
import ENDPOINTS from "@core/models/constants/endpoints";
import {
  ConversationsRawResponse,
  CreateConversationResponse,
} from "@main/models/interfaces/conversations.interfaces";
import {
  CreateGroupResponse,
  GroupsRawResponse,
} from "@main/models/interfaces/groups.interfaces";
import { PeopleRawResponse } from "@main/models/interfaces/users.interafaces";
import { Observable } from "rxjs";
import { GetProfileRawDTO } from "src/app/profile/core/interfaces/get-profile.dto";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public signup(formData: SignupDto) {
    return this.http.post(ENDPOINTS.Registration, formData);
  }

  public signin(formData: SigninDto): Observable<SigninSuccessResponse> {
    return this.http.post<SigninSuccessResponse>(ENDPOINTS.Login, formData);
  }

  public logout(): Observable<any> {
    return this.http.delete(ENDPOINTS.Logout);
  }

  public getProfile(): Observable<GetProfileRawDTO> {
    return this.http.get<GetProfileRawDTO>(ENDPOINTS.Profile);
  }

  public editProfile(name: string) {
    return this.http.put(ENDPOINTS.Profile, { name });
  }

  public getGroupsList(): Observable<GroupsRawResponse> {
    return this.http.get<GroupsRawResponse>(ENDPOINTS.Groups.list);
  }

  public createGroup(name: string): Observable<CreateGroupResponse> {
    return this.http.post<CreateGroupResponse>(ENDPOINTS.Groups.create, {
      name,
    });
  }

  public deleteGroup(groupID: string): Observable<any> {
    return this.http.delete(ENDPOINTS.Groups.delete, {
      params: { groupID },
    });
  }

  public getUsers(): Observable<PeopleRawResponse> {
    return this.http.get<PeopleRawResponse>(ENDPOINTS.Users);
  }

  public getConversations(): Observable<ConversationsRawResponse> {
    return this.http.get<ConversationsRawResponse>(
      ENDPOINTS.Conversations.list
    );
  }

  public createConversation(
    companion: string
  ): Observable<CreateConversationResponse> {
    return this.http.post<CreateConversationResponse>(
      ENDPOINTS.Conversations.create,
      { companion }
    );
  }
}
