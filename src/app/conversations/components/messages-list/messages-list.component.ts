import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from "@angular/core";
import { MessageInterface } from "@conversations/models/interfaces/message.interface";

import { MessageComponent } from "../message/message.component";

@Component({
  selector: "app-messages-list",
  standalone: true,
  imports: [CommonModule, MessageComponent],
  templateUrl: "./messages-list.component.html",
  styleUrls: ["./messages-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent implements OnChanges, AfterViewInit {
  private containerElement: HTMLDivElement;

  @ViewChild("container") container: ElementRef<HTMLDivElement>;
  @Input() messages: MessageInterface[] = [];

  ngAfterViewInit() {
    this.containerElement = this.container.nativeElement;
  }

  ngOnChanges() {
    if (this.containerElement) {
      this.containerElement.scroll({
        top: this.containerElement.scrollHeight,
      });
    }
  }
}
