import { Injectable } from "@angular/core";
import {
  interval, Observable, Subject, take
} from "rxjs";

interface TimersStorage {
  people: Subject<number>;
  groups: Subject<number>;
}

type TimerType = "people" | "groups";

@Injectable({
  providedIn: "root",
})
export class TimerService {
  private timer$: Observable<number> = interval(1000).pipe(take(60));

  private timers: TimersStorage = {
    groups: new Subject<number>(),
    people: new Subject<number>(),
  };

  get groupsTimer() {
    return this.timers.groups;
  }

  get peopleTimer() {
    return this.timers.people;
  }

  startTimer(timerType: TimerType) {
    switch (timerType) {
      case "groups":
        this.timer$.subscribe({
          next: (val) => {
            this.groupsTimer?.next(59 - val);
          },
        });
        break;
      case "people":
        this.timer$.subscribe({
          next: (val) => {
            this.peopleTimer?.next(59 - val);
          },
        });
        break;
    }
  }
}
