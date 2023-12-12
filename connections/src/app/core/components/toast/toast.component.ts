import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ToastService } from "@core/services/toast.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-toast",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  showToast$: Observable<boolean>;
  toastMessage$: Observable<string>;
  toastState$: Observable<string>;

  constructor(private toastService: ToastService) {
    this.showToast$ = toastService.showsToast$;
    this.toastMessage$ = toastService.toastMessage$;
    this.toastState$ = toastService.toastState$;
  }

  hideToast() {
    this.toastService.dismissToast();
  }
}
