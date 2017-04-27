// app.component.ts
import { Component } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { UserService } from './services/userService'
import { User } from './models/user.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app works!'
  users$: Observable<User[]>
  users: User[]
  tableView: Boolean = true

  constructor(private userService: UserService) {
    // get data and store as observable
    this.users$ = this.userService.getUsers()

    // alternative you can subscribe to observable to get users
    this.users$.subscribe(users => {
      this.users = users
    })
  }

  onSwitchView() {
    this.tableView = !this.tableView
  }
}
