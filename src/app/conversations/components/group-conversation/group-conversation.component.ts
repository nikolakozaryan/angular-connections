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
  createGroupMessageStart,
  getGroupMessagesStart,
} from "@conversations/store/conversations.actions";
import {
  selectConversationMessages,
  selectIsGroupVisited,
} from "@conversations/store/conversations.selectors";
import { ButtonComponent } from "@core/components/button/button.component";
import { Destroy } from "@core/models/classes/destroy";
import { ModalService } from "@core/services/modal.service";
import { TimerService } from "@core/services/timer.service";
import { DeleteGroupModalComponent } from "@main/components/delete-group-modal/delete-group-modal.component";
import { GroupInterface } from "@main/models/interfaces/groups.interfaces";
import { selectGroup } from "@main/store/main.selectors";
import { Store } from "@ngrx/store";
import {
  Observable, Subject, take, takeUntil, tap
} from "rxjs";

import { MessagesListComponent } from "../messages-list/messages-list.component";

@Component({
  selector: "app-group-conversation",
  standalone: true,
  imports: [
    CommonModule,
    MessagesListComponent,
    RouterModule,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: "./group-conversation.component.html",
  styleUrls: ["./group-conversation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupConversationComponent extends Destroy implements OnInit {
  public groupId: string;
  public groupData: GroupInterface | undefined;
  public messages$: Observable<MessageInterface[]>;
  public timer$: Subject<number>;
  public messageControl = new FormControl<string>("", Validators.required);
  public timerValue = "";
  public isUpdateAvailable = true;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private modalService: ModalService,
    private timerService: TimerService,
    private cdr: ChangeDetectorRef
  ) {
    super();
    this.groupId = route.snapshot.params["groupID"];
    this.timer$ = timerService.getTimer(this.groupId);
  }

  ngOnInit() {
    this.timer$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.timerValue = `${val}`.padStart(2, "0");
      this.isUpdateAvailable = !val;
      this.cdr.detectChanges();
    });

    this.messages$ = this.store.select(
      selectConversationMessages({ conversationID: this.groupId })
    );

    this.store
      .select(selectGroup(this.groupId))
      .pipe(take(1))
      .subscribe((data) => {
        this.groupData = data;
      });

    this.store
      .select(selectIsGroupVisited(this.groupId))
      .pipe(
        take(1),
        tap((conversation) => {
          if (!conversation) {
            this.store.dispatch(
              getGroupMessagesStart({ groupID: this.groupId })
            );
          }
        })
      )
      .subscribe();
  }

  deleteGroup(event: Event) {
    event.stopPropagation();
    localStorage.setItem("deleteGroupID", this.groupId);
    this.modalService.open(DeleteGroupModalComponent);
  }

  startTimer() {
    this.timerService.startTimer(this.groupId);
    this.messages$
      .pipe(
        take(1),
        tap((data) => {
          this.store.dispatch(
            getGroupMessagesStart({
              groupID: this.groupId,
              since: data[data.length - 1].createdAt,
            })
          );
        })
      )
      .subscribe();
  }

  sendMessage() {
    this.store.dispatch(
      createGroupMessageStart({
        groupID: this.groupId,
        message: this.messageControl.value as string,
      })
    );

    this.messageControl.reset();
  }
}
