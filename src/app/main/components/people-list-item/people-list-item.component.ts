import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserResponse } from "@main/models/interfaces/users.interafaces";

@Component({
  selector: "app-people-list-item",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./people-list-item.component.html",
  styleUrls: ["./people-list-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleListItemComponent {
  @Input() userData: UserResponse;

  getConversationRoute(): string {
    return `conversation/${this.userData.conversationID || 0}`;
  }
}
