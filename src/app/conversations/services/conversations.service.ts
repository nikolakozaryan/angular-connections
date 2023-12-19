import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";

@Injectable({
  providedIn: "root",
})
export class ConversationsService {
  constructor(private http: HttpService) {}

  public getGroupMessages(groupID: string, since?: string) {
    return this.http.getGroupMessages(groupID, since);
  }

  public sendGroupMessage(groupID: string, message: string) {
    return this.http.sendGroupMessage(groupID, message);
  }

  public getConversationMessages(conversationID: string, since?: string) {
    return this.http.getConversationMessages(conversationID, since);
  }

  public sendConversationMessages(conversationID: string, message: string) {
    return this.http.sendConversationMessages(conversationID, message);
  }

  public deleteConversation(conversationID: string) {
    return this.http.deleteConversation(conversationID);
  }
}
