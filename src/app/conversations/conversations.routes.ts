import { Routes } from "@angular/router";
import { authGuard } from "@core/guards/auth.guard";

import { GroupConversationComponent } from "./components/group-conversation/group-conversation.component";
import { UserConversationComponent } from "./components/user-conversation/user-conversation.component";

const CONVERSATIONS_ROUTES: Routes = [
  {
    path: "group/:groupID",
    canActivate: [authGuard],
    component: GroupConversationComponent,
  },
  {
    path: "conversation/:conversationID",
    canActivate: [authGuard],
    component: UserConversationComponent,
  },
];

export default CONVERSATIONS_ROUTES;
