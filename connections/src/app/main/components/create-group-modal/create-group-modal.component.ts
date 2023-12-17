import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "@core/components/button/button.component";
import { ModalService } from "@core/services/modal.service";
import { createGroupStart } from "@main/store/main.actions";
import { selectMainLoading } from "@main/store/main.selectors";
import { Store } from "@ngrx/store";

import { groupNameValidator } from "./validators";

@Component({
  selector: "app-create-group-modal",
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: "./create-group-modal.component.html",
  styleUrls: ["./create-group-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGroupModalComponent {
  formControl: FormControl = new FormControl("", groupNameValidator());
  loading$ = this.store.select(selectMainLoading);

  constructor(private modalService: ModalService, private store: Store) {}

  closeModal() {
    this.modalService.close();
  }

  createGroup() {
    this.store.dispatch(createGroupStart({ name: this.formControl.value }));
  }
}
