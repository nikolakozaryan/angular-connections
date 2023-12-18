import { Injectable } from "@angular/core";
import {
  interval, Observable, Subject, Subscription, take
} from "rxjs";

interface TimersStorage {
  [key: string]: Subject<number>;
}

@Injectable({
  providedIn: "root",
})
export class TimerService {
  private sub: Subscription | null;
  private timer$: Observable<number> = interval(1000).pipe(take(60));

  private timers: TimersStorage = {};

  startTimer(timerId: string) {
    this.sub?.add(
      this.timer$.subscribe((val) => {
        this.timers[timerId].next(59 - val);
      })
    );
  }

  getTimer(timerId: string) {
    if (!this.sub) {
      this.sub = new Subscription();
    }

    const timer = this.timers[timerId];
    if (!timer) {
      this.timers[timerId] = new Subject<number>();
    }

    return this.timers[timerId];
  }

  public resetTimers() {
    this.sub?.unsubscribe();
    this.sub = null;
    this.timers = {};
  }
}
