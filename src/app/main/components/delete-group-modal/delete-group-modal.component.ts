import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ButtonComponent } from "@core/components/button/button.component";
import { ModalService } from "@core/services/modal.service";
import { deleteGroupStart } from "@main/store/main.actions";
import { selectMainLoading } from "@main/store/main.selectors";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-delete-group-modal",
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: "./delete-group-modal.component.html",
  styleUrls: ["./delete-group-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteGroupModalComponent {
  loading$ = this.store.select(selectMainLoading);

  constructor(private modalService: ModalService, private store: Store) {}

  closeModal() {
    localStorage.removeItem("deleteGroupID");
    this.modalService.close();
  }

  deleteGroup() {
    const groupID = localStorage.getItem("deleteGroupID") as string;
    this.store.dispatch(deleteGroupStart({ groupID }));
  }
}
