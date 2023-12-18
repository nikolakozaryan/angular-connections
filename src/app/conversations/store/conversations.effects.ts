import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageInterface } from "@conversations/models/interfaces/message.interface";
import { ConversationsService } from "@conversations/services/conversations.service";
import { ModalService } from "@core/services/modal.service";
import { ToastService, ToastState } from "@core/services/toast.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import {
  catchError, map, of, switchMap, withLatestFrom
} from "rxjs";

import {
  createConversationMessageFailed,
  createConversationMessageStart,
  createConversationMessageSuccess,
  createGroupMessageFailed,
  createGroupMessageStart,
  createGroupMessageSuccess,
  getConversationMessagesFailed,
  getConversationMessagesStart,
  getConversationMessagesSuccess,
  getGroupMessagesFailed,
  getGroupMessagesStart,
  getGroupMessagesSuccess,
} from "./conversations.actions";
import { selectLastConversationMessageDate } from "./conversations.selectors";

@Injectable()
export default class ConversationsEffects {
  constructor(
    private actions$: Actions,
    private conversationsService: ConversationsService,
    private toastService: ToastService,
    private store: Store,
    private modalService: ModalService
  ) {}

  public getGroupMessages$ = createEffect(() => this.actions$.pipe(
    ofType(getGroupMessagesStart),
    switchMap(({ groupID, since }) => this.conversationsService.getGroupMessages(groupID, since).pipe(
      map(({ Count, Items: RawItems }) => {
        const Items: MessageInterface[] = RawItems.map((rm) => ({
          authorID: rm.authorID.S,
          createdAt: rm.createdAt.S,
          message: rm.message.S,
        }));

        this.toastService.showToast(ToastState.success, "Success!");
        return getGroupMessagesSuccess({ Count, Items, groupID });
      }),
      catchError((err: HttpErrorResponse) => {
        this.toastService.showToast(
          ToastState.error,
          `Failed! ${err.error.message}`
        );

        return of(getGroupMessagesFailed({ errorType: err.error.type }));
      })
    ))
  ));

  public createGroupMessage$ = createEffect(() => this.actions$.pipe(
    ofType(createGroupMessageStart),
    switchMap(({ groupID, message }) => this.conversationsService.sendGroupMessage(groupID, message).pipe(
      withLatestFrom(
        this.store.select(
          selectLastConversationMessageDate({ conversationID: groupID })
        )
      ),
      map(([, since]) => createGroupMessageSuccess({ groupID, since })),
      catchError((err: HttpErrorResponse) => {
        this.toastService.showToast(
          ToastState.error,
          `Failed! ${err.error.message}`
        );

        return of(createGroupMessageFailed({ errorType: err.error.type }));
      })
    ))
  ));

  public getConversationMessages$ = createEffect(() => this.actions$.pipe(
    ofType(getConversationMessagesStart),
    switchMap(({ conversationID, since }) => this.conversationsService
      .getConversationMessages(conversationID, since)
      .pipe(
        map(({ Count, Items: RawItems }) => {
          const Items: MessageInterface[] = RawItems.map((rm) => ({
            authorID: rm.authorID.S,
            createdAt: rm.createdAt.S,
            message: rm.message.S,
          }));

          this.toastService.showToast(ToastState.success, "Success!");
          return getConversationMessagesSuccess({
            Count,
            Items,
            conversationID,
          });
        }),
        catchError((err: HttpErrorResponse) => {
          this.toastService.showToast(
            ToastState.error,
            `Failed! ${err.error.message}`
          );

          return of(
            getConversationMessagesFailed({ errorType: err.error.type })
          );
        })
      ))
  ));

  public createConversationMessage$ = createEffect(() => this.actions$.pipe(
    ofType(createConversationMessageStart),
    switchMap(({ conversationID, message }) => this.conversationsService
      .sendConversationMessages(conversationID, message)
      .pipe(
        withLatestFrom(
          this.store.select(
            selectLastConversationMessageDate({
              conversationID,
            })
          )
        ),
        map(([, since]) => createConversationMessageSuccess({
          conversationID,
          since,
        })),
        catchError((err: HttpErrorResponse) => {
          this.toastService.showToast(
            ToastState.error,
            `Failed! ${err.error.message}`
          );

          return of(
            createConversationMessageFailed({ errorType: err.error.type })
          );
        })
      ))
  ));

  public updateGroupMessage$ = createEffect(() => this.actions$.pipe(
    ofType(createGroupMessageSuccess),
    map(({ groupID, since }) => getGroupMessagesStart({ groupID, since }))
  ));

  public updateConversationMessage$ = createEffect(() => this.actions$.pipe(
    ofType(createConversationMessageSuccess),
    map(({ conversationID, since }) => getConversationMessagesStart({ conversationID, since }))
  ));

  // public deleteConversation$ = createEffect(() => {});
}
