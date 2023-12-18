import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { GroupsListComponent } from "../groups-list/groups-list.component";
import { PeopleListComponent } from "../people-list/people-list.component";

@Component({
  selector: "app-main",
  standalone: true,
  imports: [CommonModule, GroupsListComponent, PeopleListComponent],
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
