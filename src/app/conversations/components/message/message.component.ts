import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { selectUserUid } from "@auth/store/auth.selectors";
import { MessageInterface } from "@conversations/models/interfaces/message.interface";
import { selectUserName } from "@main/store/main.selectors";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-message",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnInit {
  userId$ = this.store.select(selectUserUid);
  username$: Observable<string>;

  @Input() message: MessageInterface;

  constructor(private store: Store) {}

  ngOnInit() {
    this.username$ = this.store.select(selectUserName(this.message.authorID));
  }
}
