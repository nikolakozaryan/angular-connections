import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { deleteConversationStart } from "@conversations/store/conversations.actions";
import { selectConversationsLoading } from "@conversations/store/conversations.selectors";
import { ButtonComponent } from "@core/components/button/button.component";
import { ModalService } from "@core/services/modal.service";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-delete-conversation-modal",
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: "./delete-conversation-modal.component.html",
  styleUrls: ["./delete-conversation-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteConversationModalComponent {
  loading$ = this.store.select(selectConversationsLoading);

  constructor(private modalService: ModalService, private store: Store) {}

  closeModal() {
    localStorage.removeItem("deleteConversationID");
    this.modalService.close();
  }

  deleteGroup() {
    const conversationID = localStorage.getItem(
      "deleteConversationID"
    ) as string;
    this.store.dispatch(deleteConversationStart({ conversationID }));
  }
}
