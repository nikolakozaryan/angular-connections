import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ModalService } from "@core/services/modal.service";
import { GroupInterface } from "@main/models/interfaces/groups.interfaces";
import { Store } from "@ngrx/store";

import { DeleteGroupModalComponent } from "../delete-group-modal/delete-group-modal.component";

@Component({
  selector: "app-groups-list-item",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./groups-list-item.component.html",
  styleUrls: ["./groups-list-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsListItemComponent {
  @Input() groupData: GroupInterface;

  constructor(private store: Store, private modalService: ModalService) {}

  deleteGroup(event: Event) {
    event.stopPropagation();
    localStorage.setItem("deleteGroupID", this.groupData.id);
    this.modalService.open(DeleteGroupModalComponent);
  }
}
