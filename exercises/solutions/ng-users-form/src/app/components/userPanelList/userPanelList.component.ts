import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user.model';
import { UserService } from '../../services/userService';

@Component({
  selector: 'user-panel-list',
  templateUrl: './userPanelList.component.html',
  styleUrls: ['./userPanelList.component.css']
})
export class UserPanelListComponent {
  users: User[];

  constructor(private userService: UserService) {
    this.userService.getAll()
      .subscribe(users => {
        this.users = users;
      });
  }
}
