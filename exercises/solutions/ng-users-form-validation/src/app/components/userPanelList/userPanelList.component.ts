import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user.model';
import { UserService } from '../../services/userService';

@Component({
  selector: 'user-panel-list',
  templateUrl: './userPanelList.component.html',
  styleUrls: ['./userPanelList.component.css']
})
export class UserPanelListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.userService.getAll()
    //   .subscribe(users => {
    //     this.users = users;
    //   });
    this.users = this.route.snapshot.data['users'] as User[];
  }
}
