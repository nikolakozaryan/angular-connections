import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { GroupInterface } from "@main/models/interfaces/groups.interfaces";
import { deleteGroupStart } from "@main/store/main.actions";
import { Store } from "@ngrx/store";

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

  constructor(private store: Store) {}

  deleteGroup(event: Event) {
    event.stopPropagation();
    this.store.dispatch(deleteGroupStart({ groupID: this.groupData.id }));
  }
}
