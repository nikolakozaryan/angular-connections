import { Directive, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Directive()
export class Destroy implements OnDestroy {
  protected destroy$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
