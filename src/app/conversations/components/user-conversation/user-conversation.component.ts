import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-user-conversation",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./user-conversation.component.html",
  styleUrls: ["./user-conversation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserConversationComponent {

}
