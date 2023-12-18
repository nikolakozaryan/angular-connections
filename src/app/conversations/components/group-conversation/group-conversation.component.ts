import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MessageInterface } from "@conversations/models/interfaces/message.interface";
import { getGroupMessagesStart } from "@conversations/store/conversations.actions";
import { selectConversationMessages } from "@conversations/store/conversations.selectors";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-group-conversation",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./group-conversation.component.html",
  styleUrls: ["./group-conversation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupConversationComponent implements OnInit {
  public groupId: string;
  public messages$ = Observable<MessageInterface[]>;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.groupId = this.route.snapshot.params["groupID"];
    this.store
      .select(selectConversationMessages({ conversationID: this.groupId }))
      .subscribe(console.log);

    this.store.dispatch(getGroupMessagesStart({ groupID: this.groupId }));
  }
}
