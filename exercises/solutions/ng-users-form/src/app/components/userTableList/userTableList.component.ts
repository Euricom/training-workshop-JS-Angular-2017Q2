import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { UserService } from '../../services/userService';

@Component({
  selector: 'user-table-list',
  templateUrl: './userTableList.component.html',
})
export class UserTableListComponent {
  users: User[];

  constructor(private userService: UserService, private router: Router) {
    this.getUsers();
  }

  onAdd() {
    this.router.navigateByUrl('/detail');
  }

  onDelete(user) {
    this.userService.delete(user)
      .subscribe(() => {
        this.getUsers();
      });
  }

  getUsers() {
    this.userService.getAll()
      .subscribe(users => {
        this.users = users;
      });
  }
}
