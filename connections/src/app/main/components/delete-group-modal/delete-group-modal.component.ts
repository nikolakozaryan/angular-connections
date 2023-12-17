import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-delete-group-modal",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./delete-group-modal.component.html",
  styleUrls: ["./delete-group-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteGroupModalComponent {

}
