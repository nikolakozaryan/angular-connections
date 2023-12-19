import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { MessageInterface } from "@conversations/models/interfaces/message.interface";
import {
  createConversationMessageStart,
  getConversationMessagesStart,
} from "@conversations/store/conversations.actions";
import {
  selectConversationMessages,
  selectIsGroupVisited,
} from "@conversations/store/conversations.selectors";
import { ButtonComponent } from "@core/components/button/button.component";
import { Destroy } from "@core/models/classes/destroy";
import { ModalService } from "@core/services/modal.service";
import { TimerService } from "@core/services/timer.service";
import { selectUsernameByConversationId } from "@main/store/main.selectors";
import { Store } from "@ngrx/store";
import {
  Observable, Subject, take, takeUntil, tap
} from "rxjs";

import { DeleteConversationModalComponent } from "../delete-conversation-modal/delete-conversation-modal.component";
import { MessagesListComponent } from "../messages-list/messages-list.component";

@Component({
  selector: "app-user-conversation",
  standalone: true,
  imports: [
    CommonModule,
    MessagesListComponent,
    RouterModule,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: "./user-conversation.component.html",
  styleUrls: ["./user-conversation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserConversationComponent extends Destroy implements OnInit {
  public conversationId: string;
  public messages$: Observable<MessageInterface[]>;
  public timer$: Subject<number>;
  public messageControl = new FormControl<string>("", Validators.required);
  public timerValue = "";
  public isUpdateAvailable = true;
  public interlocutorName$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private modalService: ModalService,
    private timerService: TimerService,
    private cdr: ChangeDetectorRef
  ) {
    super();
    this.conversationId = route.snapshot.params["conversationID"];
    this.timer$ = timerService.getTimer(this.conversationId);
  }

  ngOnInit() {
    this.interlocutorName$ = this.store.select(
      selectUsernameByConversationId(this.conversationId)
    );

    this.timer$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.timerValue = `${val}`.padStart(2, "0");
      this.isUpdateAvailable = !val;
      this.cdr.detectChanges();
    });

    this.messages$ = this.store.select(
      selectConversationMessages({ conversationID: this.conversationId })
    );

    this.store
      .select(selectIsGroupVisited(this.conversationId))
      .pipe(
        take(1),
        tap((conversation) => {
          if (!conversation) {
            this.store.dispatch(
              getConversationMessagesStart({
                conversationID: this.conversationId,
              })
            );
          }
        })
      )
      .subscribe();
  }

  deleteConversation(event: Event) {
    event.stopPropagation();
    localStorage.setItem("deleteConversationID", this.conversationId);
    this.modalService.open(DeleteConversationModalComponent);
  }

  startTimer() {
    this.timerService.startTimer(this.conversationId);
    this.messages$
      .pipe(
        take(1),
        tap((data) => {
          this.store.dispatch(
            getConversationMessagesStart({
              conversationID: this.conversationId,
              since: data[data.length - 1].createdAt,
            })
          );
        })
      )
      .subscribe();
  }

  sendMessage() {
    this.store.dispatch(
      createConversationMessageStart({
        conversationID: this.conversationId,
        message: this.messageControl.value as string,
      })
    );

    this.messageControl.reset();
  }
}
