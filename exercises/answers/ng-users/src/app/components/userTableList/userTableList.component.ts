import { Component, Input } from '@angular/core'
import { User } from '../../models/user.model'

@Component({
  selector: 'user-table-list',
  templateUrl: './userTableList.component.html',
})
export class UserTableListComponent {
  @Input() users: any
  constructor() {
  }
}
