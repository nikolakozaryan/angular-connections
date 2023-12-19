import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { ToastService, ToastState } from "@core/services/toast.service";
import { UserResponse } from "@main/models/interfaces/users.interafaces";
import { MainService } from "@main/services/main.service";
import { updateUserConversationId } from "@main/store/main.actions";
import { Store } from "@ngrx/store";
import {
  catchError, of, take, tap
} from "rxjs";

@Component({
  selector: "app-people-list-item",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./people-list-item.component.html",
  styleUrls: ["./people-list-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleListItemComponent {
  @Input() userData: UserResponse;

  constructor(
    private mainService: MainService,
    private router: Router,
    private store: Store,
    private toastService: ToastService
  ) {}

  public resolveRoute(): void {
    if (this.userData.conversationID) {
      this.router.navigate([`conversation/${this.userData.conversationID}`]);
    } else {
      this.mainService
        .createConversation(this.userData.uid)
        .pipe(
          take(1),
          tap(({ conversationID }) => {
            this.store.dispatch(
              updateUserConversationId({
                conversationID,
                userID: this.userData.uid,
              })
            );
            this.toastService.showToast(
              ToastState.success,
              "Conversation created!"
            );
            this.router.navigate([`conversation/${conversationID}`]);
          }),

          catchError(() => {
            this.toastService.showToast(
              ToastState.error,
              "Something went wrong!"
            );
            return of("");
          })
        )
        .subscribe();
    }
  }
}
