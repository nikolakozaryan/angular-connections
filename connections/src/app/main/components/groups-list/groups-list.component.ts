import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { ButtonComponent } from "@core/components/button/button.component";
import { Destroy } from "@core/models/classes/destroy";
import { ModalService } from "@core/services/modal.service";
import { TimerService } from "@core/services/timer.service";
import { getGroupsStart } from "@main/store/main.actions";
import { selectGroups } from "@main/store/main.selectors";
import { Store } from "@ngrx/store";
import { takeUntil } from "rxjs";

import { CreateGroupModalComponent } from "../create-group-modal/create-group-modal.component";
import { GroupsListItemComponent } from "../groups-list-item/groups-list-item.component";

@Component({
  selector: "app-groups-list",
  standalone: true,
  imports: [CommonModule, GroupsListItemComponent, ButtonComponent],
  templateUrl: "./groups-list.component.html",
  styleUrls: ["./groups-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsListComponent extends Destroy implements OnInit {
  public groups$ = this.store.select(selectGroups);
  public timer$ = this.timerService.groupsTimer;
  public timerValue = 0;
  public isUpdateAvailable = true;

  constructor(
    private store: Store,
    private timerService: TimerService,
    private cdr: ChangeDetectorRef,
    private modalService: ModalService
  ) {
    super();
  }

  ngOnInit(): void {
    this.timer$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.timerValue = val;
      this.isUpdateAvailable = !val;
      this.cdr.detectChanges();
    });

    this.groups$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (!data.length) {
        this.store.dispatch(getGroupsStart());
      }
    });
  }

  startTimer() {
    this.timerService.startTimer("groups");
    this.store.dispatch(getGroupsStart());
  }

  createGroup() {
    this.modalService.open(CreateGroupModalComponent);
  }
}
