import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-messages-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./messages-list.component.html",
  styleUrls: ["./messages-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent {

}
