import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { logoutSuccess } from "@auth/store/auth.actions";
import { selectUserUid } from "@auth/store/auth.selectors";
import ROUTES from "@core/models/enums/routes.enum";
import { ModalService } from "@core/services/modal.service";
import { ToastService, ToastState } from "@core/services/toast.service";
import { ConversationResponse } from "@main/models/interfaces/conversations.interfaces";
import { GroupInterface } from "@main/models/interfaces/groups.interfaces";
import { UserResponse } from "@main/models/interfaces/users.interafaces";
import { MainService } from "@main/services/main.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import {
  catchError,
  combineLatest,
  map,
  of,
  switchMap,
  withLatestFrom,
} from "rxjs";

import {
  createGroupFailed,
  createGroupStart,
  createGroupSuccess,
  deleteGroupFailed,
  deleteGroupStart,
  deleteGroupSuccess,
  getGroupsFailed,
  getGroupsStart,
  getGroupsSuccess,
  getPeopleFailed,
  getPeopleStart,
  getPeopleSuccess,
  resetMainState,
} from "./main.actions";

@Injectable()
export default class MainEffects {
  constructor(
    private actions$: Actions,
    private mainService: MainService,
    private toastService: ToastService,
    private store: Store,
    private modalService: ModalService,
    private router: Router
  ) {}

  public getGroupsList$ = createEffect(() => this.actions$.pipe(
    ofType(getGroupsStart),
    withLatestFrom(this.store.select(selectUserUid)),
    switchMap(([, uid]) => this.mainService.getGroups().pipe(
      map((data) => {
        const items: GroupInterface[] = data.Items.map((group) => ({
          id: group.id.S,
          name: group.name.S,
          createdAt: group.createdAt.S,
          createdBy: group.createdBy.S,
          isOwner: uid === group.createdBy.S,
        }));

        this.toastService.showToast(ToastState.success, "Success!");

        return getGroupsSuccess({ Count: data.Count, Items: items });
      }),
      catchError((err: HttpErrorResponse) => {
        this.toastService.showToast(
          ToastState.error,
          `Failed! ${err.error.message}`
        );

        return of(getGroupsFailed({ errorType: err.error.type }));
      })
    ))
  ));

  public getPeopleList$ = createEffect(() => this.actions$.pipe(
    ofType(getPeopleStart),
    switchMap(() => combineLatest([
      this.mainService.getPeople(),
      this.mainService.getConverations(),
    ]).pipe(
      map(([peopleRaw, conversationsRaw]) => {
        const conversations: ConversationResponse[] = conversationsRaw.Items.map(({ companionID, id }) => ({
          id: id.S,
          companionID: companionID.S,
        }));

        const people: UserResponse[] = peopleRaw.Items.map(
          ({ name, uid }) => ({
            conversationID:
                  conversations.find(({ companionID }) => companionID === uid.S)
                    ?.id || null,
            name: name.S,
            uid: uid.S,
          })
        );

        this.toastService.showToast(ToastState.success, "Success!");

        return getPeopleSuccess({ Count: peopleRaw.Count, Items: people });
      }),
      catchError((err: HttpErrorResponse) => {
        this.toastService.showToast(
          ToastState.error,
          `Failed! ${err.error.message}`
        );

        return of(getPeopleFailed({ errorType: err.error.type }));
      })
    ))
  ));

  public createGroup$ = createEffect(() => this.actions$.pipe(
    ofType(createGroupStart),
    switchMap(({ name }) => this.mainService.createGroup(name).pipe(
      withLatestFrom(this.store.select(selectUserUid)),
      map(([{ groupID }, uid]) => {
        this.modalService.close();
        this.toastService.showToast(ToastState.success, "Success!");
        return createGroupSuccess({
          name,
          id: groupID,
          isOwner: true,
          createdBy: uid,
          createdAt: `${+new Date()}`,
        });
      }),
      catchError((err: HttpErrorResponse) => {
        this.toastService.showToast(
          ToastState.error,
          `Failed! ${err.error.message}`
        );

        return of(createGroupFailed({ errorType: err.error.type }));
      })
    ))
  ));

  public deleteGroup$ = createEffect(() => this.actions$.pipe(
    ofType(deleteGroupStart),
    switchMap(({ groupID }) => this.mainService.deleteGroup(groupID).pipe(
      map(() => {
        this.router.navigate([ROUTES.Root]);
        this.modalService.close();
        this.toastService.showToast(ToastState.success, "Success!");
        return deleteGroupSuccess({ groupID });
      }),
      catchError((err: HttpErrorResponse) => {
        this.toastService.showToast(
          ToastState.error,
          `Failed! ${err.error.message}`
        );

        return of(deleteGroupFailed({ errorType: err.error.type }));
      })
    ))
  ));

  public logout$ = createEffect(() => this.actions$.pipe(
    ofType(logoutSuccess),
    map(() => resetMainState())
  ));
}
