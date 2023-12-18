import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { ButtonComponent } from "@core/components/button/button.component";
import { Destroy } from "@core/models/classes/destroy";
import { TimerService } from "@core/services/timer.service";
import { getPeopleStart } from "@main/store/main.actions";
import { selectPeople } from "@main/store/main.selectors";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";

import { PeopleListItemComponent } from "../people-list-item/people-list-item.component";

@Component({
  selector: "app-people-list",
  standalone: true,
  imports: [CommonModule, ButtonComponent, PeopleListItemComponent],
  templateUrl: "./people-list.component.html",
  styleUrls: ["./people-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleListComponent extends Destroy implements OnInit {
  public people$ = this.store.select(selectPeople);
  public timer$: Subject<number>;
  public timerValue = 0;
  public isUpdateAvailable = true;

  constructor(
    private store: Store,
    private timerService: TimerService,
    private cdr: ChangeDetectorRef
  ) {
    super();
    this.timer$ = timerService.getTimer("people");
  }

  ngOnInit(): void {
    this.timer$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.timerValue = val;
      this.isUpdateAvailable = !val;
      this.cdr.detectChanges();
    });

    this.people$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (!data.length) {
        this.store.dispatch(getPeopleStart());
      }
    });
  }

  startTimer() {
    this.timerService.startTimer("people");
    this.store.dispatch(getPeopleStart());
  }
}
