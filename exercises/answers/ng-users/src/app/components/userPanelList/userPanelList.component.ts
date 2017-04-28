import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'user-panel-list',
  templateUrl: './userPanelList.component.html',
  styleUrls: ['./userPanelList.component.css']
})
export class UserPanelListComponent {
  @Input() users: Observable<User[]>;

  constructor() {
  }
}
