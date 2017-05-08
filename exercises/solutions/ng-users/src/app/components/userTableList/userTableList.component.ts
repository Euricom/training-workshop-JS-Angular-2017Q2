import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';

function dynamicSort(property, sortOrder = 1) {
    return function (a, b) {
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}

@Component({
  selector: 'user-table-list',
  templateUrl: './userTableList.component.html',
})
export class UserTableListComponent {
  @Input() users: any;
  sortBy= '';
  sortOrder = 1;
  constructor() {
  }

  onSort(fieldName) {
    if (this.sortBy === fieldName) {
      this.sortOrder = (this.sortOrder === 1) ? -1 : 1;
    }
    this.sortBy = fieldName;
    this.users.sort(dynamicSort(this.sortBy, this.sortOrder));
  }
}
